# frozen_string_literal: true

require_relative "lib/nocturne/editorial/version"

Gem::Specification.new do |spec|
  spec.name          = "nocturne-editorial"
  spec.version       = Nocturne::Editorial::VERSION
  spec.authors       = ["Ben Wilson"]
  spec.email         = ["ben@merovex.com"]

  spec.summary       = "Dark atmospheric Jekyll theme for speculative fiction publishers"
  spec.description   = "Nocturne Editorial is a gem-based Jekyll theme with OKLCH color system, light/dark mode, and layouts for books, series, authors, and blog posts."
  spec.homepage      = "https://github.com/merovex/nocturne-editorial"
  spec.license       = "MIT"
  spec.required_ruby_version = ">= 2.6.0"

  spec.metadata["plugin_type"] = "theme"
  spec.metadata["homepage_uri"] = spec.homepage
  spec.metadata["source_code_uri"] = spec.homepage

  spec.files = `git ls-files -z`.split("\x0").select do |f|
    f.match(%r!^(assets|_layouts|_includes|lib|LICENSE|README)!i)
  end

  spec.add_runtime_dependency "jekyll", ">= 4.0", "< 5.0"
  spec.add_runtime_dependency "jekyll-feed", "~> 0.12"
  spec.add_runtime_dependency "jekyll-seo-tag", "~> 2.7"

  spec.add_development_dependency "bundler"
  spec.add_development_dependency "rake", "~> 13.0"
end
