require 'erb'
require 'maruku'
require 'ftools'

class Speecher
  BASE_PATH = File.join(File.dirname(File.expand_path(__FILE__)), "..")

  def initialize(markdown, template=:default)
    @markdown = File.open(markdown, "r").read
    @markdown.gsub!("!step", "<span class='step'></span>")
    @slides = Maruku.new(@markdown).to_html.split("<hr />")
  end

  def slideshow(name="slideshow.html")
    Dir.mkdir("js") unless File.exists?("js")
    %w(jquery.min.js jquery-ui.min.js speecher.js).each do |file|
      File.copy(File.join(BASE_PATH, "js", file), File.join("js", file))
    end
    File.open(name, "w") do |f|
      f.write to_html
    end
  end

  def to_html
    template = ERB.new(TEMPLATE)
    result = template.result(binding)
  end

  TEMPLATE = <<-EOF
<?xml version='1.0' encoding='utf-8' ?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html>
  <head>
    <script src="js/jquery.min.js"></script>
    <script src="js/jquery-ui.min.js"></script>
    <script src="js/speecher.js"></script>
    <style type="text/css">
      body {
        font-family: sans-serif;
        font-size: 1.5em;
        padding-top: 4em;
      }
      .slide {
        margin: 0 auto;
        width: 70%;
      }
      h1, h2, h3, h4, h5, h6 {
        color: #2a2a2a;
      }
      li {
        line-height: 1.5em;
      }
    </style>
  </head>
  <body>
    <% @slides.each do |slide| %>
      <div class="slide">
        <%= slide %>
      </div>
    <% end %>
  </body>
</html>
  EOF
end
