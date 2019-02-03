$(document).ready(function() {
    $('.dashboard-panel__user-online').select2({
        placeholder: $('.dashboard-panel__user-online').data('usersOnline'),
        allowClear: true,
        minimumResultsForSearch: -1,
        width: 'style'
    });
});