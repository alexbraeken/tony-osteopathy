+function ($) {
$('#image-modal').on('show.bs.modal', function (event) {
  var button = $(event.relatedTarget)
  var src = button.data('imageinfo')
  var modal = $(this)
  modal.find('.modal-image').attr('src', src)
});

$('#extra-benefits').on('shown.bs.collapse', function () {
       $(document).find("#expand-icon").removeClass("fas fas fa-angle-double-down").addClass("fas fa-angle-double-up");
});

$('#extra-benefits').on('hidden.bs.collapse', function (e) {
  $(document).find("#expand-icon").removeClass("fas fas fa-angle-double-up").addClass("fas fa-angle-double-down");
});

}(jQuery);
