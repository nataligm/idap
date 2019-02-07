function formatSelectionParenthesesWithSpan (selection) {
    if (!selection.id) {
        return selection.text;
    }
    console.log(selection);
    var match = selection.text.match('\\(.*\\)');
    if (!match) {
        return '<span>' + selection.text + '</span>';
    }
    return $('<span>' + match.input.slice(0, match.index) + '<span class="main__projects_search__order">' + match[0] + '</span></span>');
}

$(document).ready(function() {
    $('.dashboard-panel__user-online').select2({
        placeholder: $('.dashboard-panel__user-online').data('usersOnline'),
        allowClear: true,
        minimumResultsForSearch: -1,
        dropdownCssClass: 'select2-dropdown__option dashboard-panel-dropdown__option',
        width: '173px'
    });
    $('.main__projects_search').select2({
        allowClear: false,
        minimumResultsForSearch: -1,
        dropdownCssClass: 'select2-dropdown__option main__search-dropdown__option',
        width: '229px',
        templateSelection: formatSelectionParenthesesWithSpan,
        templateResult: formatSelectionParenthesesWithSpan
    });
});