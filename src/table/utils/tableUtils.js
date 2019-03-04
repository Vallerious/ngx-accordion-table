export default {
    calcRemainingWidth: (colDefs) => {
        let colsWithWidth = 0;
        let sum = colDefs.reduce((prev, next) => {
            if (next.width) {
                colsWithWidth++;
            }

            return prev + (next.width || 0);
        }, 0);

        return (100 - sum) / (colDefs.length - colsWithWidth);
    }
};