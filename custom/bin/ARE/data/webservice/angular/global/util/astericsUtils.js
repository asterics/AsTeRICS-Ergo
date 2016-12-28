asterics.utils = {
    createCellBoardItem: function(title, faIcon, clickAction) {
        return {
            title: title,
            faIcon: faIcon,
            clickAction: clickAction
        };
    },
    createSelectItem: function(title, faIcon) {
        return {
            title: title,
            faIcon: faIcon
        };
    }
};
