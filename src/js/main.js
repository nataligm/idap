function formatSelectionParenthesesWithSpan (selection) {
    if (!selection.id) {
        return selection.text;
    }
    var match = selection.text.match('\\(.*\\)');
    if (!match) {
        return '<span>' + selection.text + '</span>';
    }
    return $('<span>' + match.input.slice(0, match.index) + '<span class="main__projects_search__order">' + match[0] + '</span></span>');
}

$(document).ready(function() {
    //SELECTS
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

    $('.main__show').on('click', function () {
        var taskContainer = $(this).parent().parent().parent();
        console.log(taskContainer);
        console.log(taskContainer.hasClass('main__task'));
        if (taskContainer.hasClass('main__task_active')) {
            taskContainer.find('.main__subtasks').hide();
            taskContainer.removeClass('main__task_active');
        } else {
            taskContainer.find('.main__subtasks').show();
            taskContainer.addClass('main__task_active');
        }
    })
});