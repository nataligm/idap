function formatSelectionWithSpan (selection) {
    if (!selection.id) {
        return selection.text;
    }
    return $('<div class="main__new-projects">New Projects <span class="main__descending">(descending)</span></div>');
}

$(document).ready(function() {
    $('.dashboard-panel__user-online').select2({
        placeholder: $('.dashboard-panel__user-online').data('usersOnline'),
        allowClear: true,
        minimumResultsForSearch: -1,
        dropdownCssClass: 'select2-dropdown__option',
        width: '173px'
    });
    $('.dashboard-panel__user-online-2').select2({
        placeholder: $('.dashboard-panel__user-online').data('usersOnline'),
        allowClear: true,
        minimumResultsForSearch: -1,
        dropdownCssClass: 'dashboard-panel__user-online__dropdown',
        width: '173px',
        templateSelection: formatSelectionWithSpan
    });
});