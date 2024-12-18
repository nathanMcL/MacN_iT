## Setting up a Rails, Devise

- Devise: This is a popular gem in Rails that provides out-of-the-box solutions for user authentication, including secure password handling, email confirmation, and password reset functionality.<br>

### Install and setup Devise...

- Add Devise to your Gemfile:

`gem 'devise'`

- Install the gem by running:

`bundle install`

- Set up Devise in your Rails app:

`rails generate devise:install`

>-  Terminal Message

```
rails generate devise:install
      create  config/initializers/devise.rb
      create  config/locales/devise.en.yml
===============================================================================

Depending on your application's configuration some manual setup may be required:

  1. Ensure you have defined default url options in your environments files. Here
     is an example of default_url_options appropriate for a development environment
     in config/environments/development.rb:

       config.action_mailer.default_url_options = { host: 'localhost', port: 3000 }

     In production, :host should be set to the actual host of your application.

     * Required for all applications. *

  2. Ensure you have defined root_url to *something* in your config/routes.rb.
     For example:

       root to: "home#index"

     * Not required for API-only Applications *

  3. Ensure you have flash messages in app/views/layouts/application.html.erb.
     For example:

       <p class="notice"><%= notice %></p>
       <p class="alert"><%= alert %></p>

     * Not required for API-only Applications *

  4. You can copy Devise views (for customization) to your app by running:

       rails g devise:views

     * Not required *
```
- `Terminal Message`

`conflict  config/initializers/devise.rb
Overwrite D:/myPython/WebDesignSummer24/RubyRails_design/MacNserver/config/initializers/devise.rb? (enter "h" for help) [Ynaqdhm]`<br>

- `[Ynaqdhm]` Options... Enter `Y` though...<br>
```
Y: Yes – Overwrite the file with the new one. Choose this option if you want to replace the existing devise.rb file with the new default one generated by Devise. This is typically safe if you haven't made significant customizations to the existing file yet.

n: No – Do not overwrite the file. Choose this option if you’ve already configured the existing devise.rb file and don't want to lose your changes. This will keep your current settings.

a: All – Overwrite all conflicting files without asking again. This would overwrite all existing files generated by Devise in your project (not just devise.rb). Only use this if you're confident overwriting everything.

q: Quit – Stops the generator entirely without making any changes.

d: Diff – Shows the differences between the existing file and the new one Devise wants to create. This is useful if you want to see what exactly would change before deciding.

h: Help – Displays help with more information on the options.

m: Merge – Opens an interactive merge tool to help you combine changes from both files. This is more advanced and usually useful if you're familiar with handling conflicts.
```


- Generate the Devise User model:

`rails generate devise User`

- Run the migration:

`rails db:migrate`

### Enhancing Device: Enable Account Locking...

To enable account locking after a specified number of failed login attempts, use the lockable model in Devise. This can lock the user's account after a specified number of failed attempts.<br>

- 1.  Modify the User Model: Add `:lockable` to the `devise` options in the `User` model (app/models/user.rb)...<br>
```
class User < ApplicationRecord
  devise :database_authenticatable, :registerable, :recoverable, :rememberable, :validatable, :lockable
end
```

- 2. Generate Migration for Lockable Fields: You’ll need to add the required columns for tracking failed attempts, lockout time, and unlock token to your users table. Run the following command:<br>

`rails generate migration add_lockable_to_users failed_attempts:integer unlock_token:string locked_at:datetime`

- After this, run the migration:

`rails db:migrate`

- 3. Configure Lockable Options in Devise: In `config/initializers/devise.rb`, configure how account locking works...<br>

```
# Lock strategy can be :failed_attempts or :none.
config.lock_strategy = :failed_attempts

# Unlock strategy can be :time, :email, :both, or :none.
config.unlock_strategy = :email

# Number of authentication attempts before locking an account.
config.maximum_attempts = 3

# Time period that the user will be locked out after reaching maximum attempts.
config.unlock_in = 1.hour

# Number of attempts users have to unlock the account via email before it's permanently locked.
config.last_attempt_warning = true
```

### Logging Lockouts and Security Events...

To track how often a user has been locked out and log security events, we can add custom logs to track events.<br>

Customize the lockable behavior: You can add additional logging by overriding Devise’s lockable behavior within the User model or by creating a custom controller that tracks these events.<br>

Create a Custom Controller for Devise: If you want to log specific events like when a user is locked out or when their account is unlocked, you can create a custom controller:<br>

`rails generate devise:controllers users`<br>

This will generate `app/controllers/users/unlocks_controller.rb`. Inside this file, you can add custom logic to log lockout events:<br>

```
class Users::UnlocksController < Devise::UnlocksController
  def create
    super
    Rails.logger.info "User #{resource.email} requested an unlock email after #{resource.failed_attempts} failed attempts."
  end

  def show
    super
    Rails.logger.info "User #{resource.email} unlocked their account."
  end
end
```
### Additional Logging...

- Rails logs all HTTP requests, including failed logins. However, you can add custom logging messages for failed attempts or when accounts are locked, to keep track of those events specifically.

For example, in the User model, you can add callbacks to log failed attempts:

```
class User < ApplicationRecord
  devise :database_authenticatable, :lockable, :recoverable, :rememberable, :validatable

  after_update :log_failed_attempts

  private

  def log_failed_attempts
    if self.failed_attempts > 0
      Rails.logger.info "User #{self.email} failed to log in. Failed attempts: #{self.failed_attempts}"
    end

    if self.access_locked?
      Rails.logger.info "User #{self.email} is locked out after #{self.failed_attempts} failed attempts."
    end
  end
end
```

This will add log entries to the `log/development.log` or `log/production.log` files, tracking failed login attempts and lockouts.<br>

- Optional: Track Lockout Events in the Database: If you need more detailed tracking, such as how many times a user has been locked out, you can add a lockout_count field to the User model:<br>

Generate a migration to add the column:<br>

`rails generate migration add_lockout_count_to_users lockout_count:integer`<br>

Update the User model to increment the counter whenever the user is locked out:<br>

```
class User < ApplicationRecord
  devise :database_authenticatable, :lockable, :recoverable, :rememberable, :validatable

  before_save :increment_lockout_count, if: :access_locked?

  private

  def increment_lockout_count
    self.lockout_count ||= 0
    self.lockout_count += 1
  end
end
```

### Secure Password Handling...

### Password Complexity: Enforce stronger password requirements in `config/initializers/devise.rb`, add validation for password length

```
config.password_length = 8..128
```

## Login & Signup Configuration

Next, Once the user clicks the robot image to navigate to the login/signup page, we must establish and configure routes.<br>

- 1. Set your root route to point to your index.html. <br>
- 2. Add links to Devise’s login (new_user_session_path) and signup (new_user_registration_path) in your index.html.erb.<br>
- 3. Ensure Devise routes are correctly set up in config/routes.rb. <br>
- 4. Style the links to match your website's design. <br>

### Set the `Root` Route...

- 1. Locate `config/routes.rb`, and define the root route:<br>

`root 'home#index'`

- Assuming we haven't  created the `home_controller` with an `index` action...<br>

`rails generate controller Home index`

- This will create the necessary controller and view to render the index.html.<br>

- 2. Link to Devise Login and Signup:

- Now, we need to add links to the Devise login and signup pages from the `index.html.erb` (or wherever you want users to navigate to the login/signup pages).

Open your `index.html.erb` file (located under `app/views/home/index.html.erb`) and add the following links:

```
<%= link_to 'Login', new_user_session_path %>
<%= link_to 'Sign Up', new_user_registration_path %>
```

- This will generate links to Devise’s login and signup pages. The new_user_session_path directs to the login page (/users/sign_in), and the new_user_registration_path directs to the signup page (/users/sign_up).<br>

- 3. Ensure Devise Routes Are Available: <br>

- Make sure that the Devise routes are set up in your `config/routes.rb` file:<br>

`devise_for :users`

- This line should have been added automatically when you set up Devise. You can check that the routes are correctly linked by running:<br>

`rails routes`

- This will list all the available routes, including the ones for sign_in, sign_up, etc.<br>

### Next... after login/signup navigate to the user dashboard view

## Link the Robot image to Devise's Login Page...

- In the `index.html.erb` we can make the logo image clickable and navigate the users to the login page.<br>

- Open the `app/views/home/index.html.erb`, and modify the logo image...

```
<div class="image-container">
  <%= link_to new_user_session_path do %>
    <%= image_tag "path/to/robot-image.png", id: "robot-image", alt: "Gabba's Chat Robot" %>
  <% end %>
</div>
```

### Devise's Default Routes...

- Devise automatically generates routes for authentication, these are the default paths:

- Login: `/users/sign_in`
- Signup: `/users/sign_up`
- Logout: `/users/sign_out`

### Check the Routes...

`rails routes`

### Webpacker, Node.js, and OpenSSL troubleshooting

- Node.js v20 is causing an error with Webpack, making it fail to compile the assets, this causes a 500 Internal Server Error.<br>

- 1. Update Node.js Version... The error message I received ( ERR_OSSL_EVP_UNSUPPORTED ) is common with recent (10/3/2024) version of Node.js (v17 and above).<br>

- Option A: Downgrade Node.js to an LTS version like v16...<br>
<br>
- Option B: Set an environment variable to use the legacy OpenSSL provider with the current Node.js version...<br>

### Option 2: Use Legacy OpenSSL Provider

- 1. In Vs code, navigate to the correct directory, In `pwsh`<br>

In Windows:<br>
`set NODE_OPTIONS=--openssl-legacy-provider`<br>

- This should allow Webpack to compile the assets without throwing the OpenSSL error.

- 2. Test now to check if the OpenSSL error is resolved...

### On to `rails webpacker:compile`

- 1. Uninstall Node.js v20.x and Downgrade to v16.20.2(LTS)

- Using Windows I navigated `settings/apps/installed apps` Node.js v20.x.<br>

### Install Fast Node Manager (fnm)

First, install **fnm** (Fast Node Manager) to manage different versions of Node.js.<br>

`winget install Schniz.fnm`<br>

### Configure `fnm` Environment

- To use fnm on every terminal load enter:

`fnm env --use-on-cd | Out-String | Invoke-Expression`<br>

- If that doesn't work immediately, restart the terminal or computer to ensure the environment variables are properly configured.

### Install Node.js v16.20.2

- Using fnm, install Node.js v16.20.2:

`fnm use --install-if-missing 16.20.2` <br>

- Verify the installation:

```
node -v   # should print v16.20.2
npm -v    # should print the corresponding npm version, example, 8.19.4
fnm -v    # should print the installed fnm version, example, 1.37.1
```

### Resolve Webpacker Issues

Remove `node_modules` and `package-lock.json`<br>

Choosing to remove `node_modules` and the lock file to start with a clean setup:<br>

`rm -rf node_modules && rm package-lock.json`

### Reinstall Dependencies

- Reinstall dependencies via yarn:

`yarn install`

### Downgrade babel-loader

- Due to a mismatch between babel-loader and webpack versions, I chose to downgraded the babel-loader:

`yarn add babel-loader@8.3.0 --dev`

### Install Missing Babel Plugins

There were multiple missing Babel plugins and installed them sequentially.

- Dynamic Import Plugin:

`yarn add @babel/plugin-syntax-dynamic-import --dev`

- Transform Destructuring Plugin:

`yarn add @babel/plugin-transform-destructuring --dev`

- Class Properties Plugin: Due to deprecation warnings, used the following plugin:

`yarn add @babel/plugin-transform-class-properties --dev`

- Object Rest Spread Plugin:

`yarn add @babel/plugin-transform-object-rest-spread --dev`

- Private Methods Plugin:

`yarn add @babel/plugin-transform-private-methods --dev`

### Adjust babel.config.js 

The `babel.config.js` file was updated with the new plugin referances.<br>

```
module.exports = function(api) {
  return {
    presets: [
      [
        '@babel/preset-env',
        {
          useBuiltIns: 'entry',
          corejs: 3
        }
      ]
    ],
    plugins: [
      '@babel/plugin-syntax-dynamic-import',
      '@babel/plugin-transform-destructuring',
      ['@babel/plugin-transform-class-properties', { loose: true }],
      ['@babel/plugin-transform-object-rest-spread', { useBuiltIns: true }],
      ['@babel/plugin-transform-private-methods', { loose: true }],
      '@babel/plugin-transform-runtime',
      '@babel/plugin-transform-regenerator'
    ]
  };
};
```

## Recompile Webpack Assets

- Once the necessary dependencies and plugins were installed, I compiled the Webpack assets using the following command:<br>

`rails webpacker:compile`

- Success Message

If successful, you should see a message similar to this:<br>

```
vbnet
Copy code
Compiling...
Compiled all packs in /path/to/your/app/public/packs
Hash: ea1Super59suPeBadb165
Version: webpack 4.46.0
Time: 12350ms
Built at: 10/04/2024 3:50:56 PM
```

## Start the server...

`rails server` 

- Hover over the logo and click, this will navigate the user to the login page.<br>

Currently 10/05/2024@1330 there is no Styles applied to the `new.html.erb`.<br>

Located:<br>

`app/views/devise/sessions/new.html.erb`

- See `rails_styles.md` for styles notes...<br>
