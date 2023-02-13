export default {
  main: [
    {
      name: "Inicio",
      to: "home",
      icon: "si si-home",
    },
    {
      name: "Usuarios",
      to: "person_list",
      icon: "fas fa-light fa-gear",
      roles: ["admin"],
    },
    {
      name: "Mi perfil",
      to: "profile",
      icon: "si si-user",
    },
    {
      name: "Asistencia",
      to: "attendance",
      icon: "fa fa-check",
    },
    {
      name: "Pagos",
      to: "payments",
      icon: "fa-solid fa-receipt",
      roles: ["admin"],
    },
    {
      name: "Ciclos",
      to: "cycle_list",
      icon: "fa-brands fa-readme",
      roles: ["admin"],
    },
  ],
};
