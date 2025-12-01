//Script for the delete button alert in list
function confirmDelete(id) {
  Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to undo this action.",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#113675",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!",
  }).then((result) => {
    if (result.isConfirmed) {
      window.location.href = "/records/delete/" + id;
    }
  });
}
