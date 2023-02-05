import Swal from "sweetalert2";
const toast = Swal.mixin({
  buttonsStyling: false,
  target: "#page-container",
  customClass: {
    confirmButton: "btn btn-success m-1",
    cancelButton: "btn btn-success",
  },
  confirmButtonText: "De acuerdo",
  cancelButtonText: "No",
});
export const useResponse = () => {
  function showAlert(payload, maybeerror = false) {
    const { ok, message } = payload;
    if (!payload) {
      if (maybeerror) {
        return {
          type: "error",
          title: "Ocurrió algo inesperado",
          color: "alert alert-danger",
          message: "Inténtelo mas tarde por favor",
        };
      }
      return {
        type: "success",
        title: "En hora buena!",
        message: "Operación correcta",
      };
    }
    return {
      type: ok ? "success" : "warning",
      title: ok ? "En hora buena!" : "Ocurrió algo inesperado",
      color: `alert alert-${ok ? "success" : "warning"}`,
      message: message,
    };
  }

  function showNotify(response) {
    const { title, message, type } = showAlert(response);
    toast.fire(title, message, type);
  }

  async function confirm(title, callback) {
    toast
      .fire({ title, icon: "question", showCancelButton: true })
      .then((result) => {
        if (result.isConfirmed) {
          callback();
        }
      });
  }

  return {
    showAlert,
    showNotify,
    confirm,
  };
};
