## Feng Shui the user login / Signup process...

We can customize the newly created `Devise` `index.html.erb` file. For example you can use your brand logo and design...<br>

```
<%= link_to 'Login', new_user_session_path, class: 'custom-login-link' %>
<%= link_to 'Sign Up', new_user_registration_path, class: 'custom-signup-link' %>
```

Then in the styles.css...<br>

```
.custom-login-link {
  color: var(--Op1_second-color);
  text-decoration: none;
  font-weight: bold;
}

.custom-signup-link {
  color: var(--Op1_third-color);
  text-decoration: none;
  font-weight: bold;
}

.custom-login-link:hover,
.custom-signup-link:hover {
  color: var(--Op1_first-color);
}
```

