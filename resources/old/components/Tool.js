// Class that contains some helper functions
export default class Tool {
    /**
     * Function to sort an array based on search query
     * @param {array} arrayToSort Array to sort
     * @param {string} query Search query
     * @param {string} option Search option
     * @param {string} direction Search direction
     */
    static sort(arrayToSort, query, option, direction) {
        // Temporary array to be sorted, which filters out results not in the search input field
        var temp = arrayToSort.filter(e => (!isNaN(e[option] * 1) || e[option].toLowerCase().includes(query.toLowerCase()) ? true : false));
        // Sort array based on search option
        temp.sort((a, b) => {
            // Check if number is an integer
            if (isNaN(a[option] * 1)) {
                // Sorting for strings
                const al = a[option].toLowerCase();
                const bl = b[option].toLowerCase();
                if (direction === 'ASC') return al > bl ? 1 : bl > al ? -1 : 0;
                else return bl > al ? 1 : al > bl ? -1 : 0;
            } else {
                // Sorting for numbers
                if (direction === 'ASC') return Math.sign(a[option] - b[option]);
                else return Math.sign(b[option] - a[option]);
            }
        });
        return temp;
    }
}
