<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <a class="navbar-brand" href="#">Navbar</a>
    <button
      class="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#navbarSupportedContent"
      aria-controls="navbarSupportedContent"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav mr-auto">
        <li class="nav-item">
          <router-link :to="{ name: 'home'}" class="nav-link">
              Home
          </router-link>
        </li>

        <li class="nav-item">
          <router-link :to="{ name: 'singin'}" class="nav-link">
              Sign In
          </router-link>
        </li>

        <li class="navbar-text">
          Thiago Prado
        </li>

        <li class="nav-item">
          <router-link :to="{ name: 'dashboard'}" class="nav-link">
              Dashboard
          </router-link>
        </li>

        <li class="nav-item">
            <a class="nav-link" href="#">Sign Out</a>
        </li>

        
      </ul>
    </div>
  </nav>
</template>