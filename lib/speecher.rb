require 'erb'
require 'rdiscount'
require 'ftools'

class Speecher
  BASE_PATH = File.join(File.dirname(File.expand_path(__FILE__)), "..")

  def initialize(markdown, template=:default)
    @markdown = File.open(markdown, "r").read
    @slides = RDiscount.new(@markdown).to_html.split("<hr />")
  end

  def slideshow
    Dir.mkdir("js") unless File.exists?("js")
    %w(jquery.min.js jquery-ui.min.js speecher.js).each do |file|
      File.copy(File.join(BASE_PATH, "js", file), File.join("js", file))
    end
    File.open("slideshow.html", "w") do |f|
      f.write to_html
    end
  end

  def to_html
    template = ERB.new(TEMPLATE)
    result = template.result(binding)
  end

  TEMPLATE = <<-EOF
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
            width: 60%;
          }
          h1, h2, h3, h4, h5, h6 {
            color: #2a2a2a;
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
