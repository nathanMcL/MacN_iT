## Starting a Ruby, Rails Application

### Create a Rails project

- 1. Install Ruby `https://rubyinstaller.org/`.<br>

- 2. Install Rails `gem install rails`.<br>

- 3. Create a new Rails project `rails new Nameofserver`.<br>

### Configure HTTPS in Rails

In the Rails root directory, locate the config/puma.rb file. You’ll configure Puma (the default Rails server) to use HTTPS:<br>
```
# Inside config/puma.rb
ssl_bind '0.0.0.0', '3000', {
  key: 'C:/Users/Key/location/for the/server.key',
  cert: 'C:/Users/Cert/location/for the/server.cert'
}
```

- Replace the paths with the absolute paths to your key and certificate files.<br>

- Port 3000 is used here for testing, but you can set it to 443 for production.<br>

### Troubleshooting SSL...

- If you receive as error stating "Puma compiled without SSL support,"

- There are two options here Disable or Generate Controller Pages:

- 1. Disable SSL for local development by commenting out the ssl_bind section in `config/puma.rb`.
<br>
Or...<br>
<br>
- 2. Reinstall Puma with SSL support...
```
gem uninstall puma
gem install puma -- --with-ssl
```

### Create a controller to handle routes

- Create a controller for static files `rails generate controller Pages`.<br>

- This creates a `PagesController`. Next, open app/controllers/pages_controller.rb and define an action for the root URL:<br>

```
class PagesController < ApplicationController
  def index
    render file: Rails.root.join('public', 'index.html')
  end
end
```

- This will render index.html from the public folder<br>

### Organizing Static files

- Rails has built-in support for serving static files (like HTML, CSS, JS).<br>

- Put index.html inside the public/ folder.

- Place your CSS files in public/stylesheets/.

- JavaScript files can go in public/javascripts/.

- Link these files to index.html:

### Link those files to the `index.html`

```
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Gabba's Chat</title>
    <link rel="stylesheet" href="/stylesheets/style.css">
    <script src="/javascripts/script.js"></script>
</head>
```


### Configure Routes

- You need to route requests to the `PagesController` and make sure Rails serves the correct files,<br>
- Open `config/routes.rb` and add the route:

```
Rails.application.routes.draw do
  root 'pages#index'
end
```

- This will serve the `index.html` when a user navigates to the root URL.<br>

### Logging Requests

- Modify the app/controllers/application_controller.rb<br>

```
class ApplicationController < ActionController::Base
  before_action :log_request

  private

  def log_request
    log_data = "#{Time.now.utc} - #{request.method} #{request.url}\n"
    File.open(Rails.root.join('log', 'custom.log'), 'a') { |f| f.write(log_data) }
  end
end
```

### Start the Rails Server

- To start the server: `rails server`.<br>

- `https://localhost:3000` or on port 443 if configured.<br>

### Troubleshooting Issues...

- You may see the following warnings when running the Rails server on Windows:
```
*** SIGUSR2 not implemented, signal based restart unavailable!
*** SIGUSR1 not implemented, signal based restart unavailable!
*** SIGHUP not implemented, signal based logs reopening unavailable!
```
- These warnings are related to Unix-based signals and are safe to ignore on Windows.

