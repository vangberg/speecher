Gem::Specification.new do |s|
  s.name     = "speecher"
  s.version  = "0.2.2"
  s.date     = "2009-03-12"
  s.summary  = "in-browser presentations"
  s.email    = "harry@vangberg.name"
  s.homepage = "http://ichverstehe.github.com/speecher"
  s.description = "in-browser presentations"
  s.authors  = ["Harry Vangberg"]
  s.files    = ["README", 
		"speecher.gemspec", 
		"lib/speecher.rb",
    "js/speecher.js",
    "js/jquery.min.js",
    "js/jquery-ui.min.js",
    "bin/speecher"]
  s.executables = "speecher"
  s.add_dependency "maruku"
end
