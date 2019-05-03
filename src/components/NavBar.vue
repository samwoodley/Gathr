<template>
  <div class="col-sm-12 col-md-12 col-lg-12 mb-3 pr-4.5">
    <nav class="navbar navbar-expand-lg navbar-light bg-light" style="border-radius: 10px;">
      <div class="d-flex flex-grow-1">
        <span class="w-100 d-lg-none d-block"></span>
        <a class="navbar-brand d-none d-lg-inline-block">
          <img src="Images/logo.png" style="width: 150px;">
        </a>

        <div class="w-100 text-right">
          <button
            class="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#myNavbar"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
        </div>
      </div>
      <div class="collapse navbar-collapse flex-grow-1 text-right" id="myNavbar">
        <ul class="navbar-nav ml-auto flex-nowrap">
          <li class="nav-item">
            <router-link to="/dashboard" class="nav-link m-2 menu-item active">
              <a>Dashboard</a>
            </router-link>
          </li>
          <li class="nav-item">
            <router-link to="/" class="nav-link m-2 menu-item">
              <a>Sign Out</a>
            </router-link>
          </li>
        </ul>
      </div>
    </nav>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.navbar-brand {
  margin-right: 30px;
}
.nav-link {
  font-size: 26px;
  padding-bottom: 0;
  cursor: pointer;
  padding-top: 5px;
}
.nav-item {
  margin-right: 30px;
}
.nav-link {
  padding-top: 1px;
}
</style>
