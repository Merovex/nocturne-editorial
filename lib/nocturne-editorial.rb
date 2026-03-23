# frozen_string_literal: true

require "digest"
require "jekyll"
require_relative "nocturne/editorial/version"

module Nocturne
  module Editorial
    class Error < StandardError; end

    class FingerprintGenerator < Jekyll::Generator
      safe true
      priority :highest

      def generate(site)
        fingerprints = {}

        roots = []
        roots << site.theme.root if site.theme
        roots << site.source

        roots.each do |root|
          %w[css js].each do |ext|
            asset_dir = File.join(root, "assets", ext)
            next unless Dir.exist?(asset_dir)

            Dir.glob(File.join(asset_dir, "**", "*.#{ext}")).each do |file|
              relative_path = file.sub(root, "")
              digest = Digest::MD5.hexdigest(File.read(file))[0..7]
              fingerprints[relative_path] = digest
            end
          end
        end

        site.data["fingerprints"] = fingerprints
        Jekyll.logger.info "NocturneEditorial:", "Generated #{fingerprints.size} asset fingerprints"
      end
    end

    module FingerprintFilter
      def fingerprint(path)
        site = @context.registers[:site]
        if site.data["fingerprints"] && site.data["fingerprints"][path]
          "#{path}?v=#{site.data["fingerprints"][path]}"
        else
          file = File.join(site.source, path)
          if File.exist?(file)
            digest = Digest::MD5.hexdigest(File.read(file))[0..7]
            "#{path}?v=#{digest}"
          else
            path
          end
        end
      end
    end
  end
end

Liquid::Template.register_filter(Nocturne::Editorial::FingerprintFilter)
