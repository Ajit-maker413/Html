$(document).ready(function() {
    let allBooks = [];

    // 1. Initial AJAX call to load XML and convert to JSON
    $.ajax({
        type: "GET",
        url: "books.xml",
        dataType: "xml",
        success: function(xml) {
            $(xml).find('book').each(function() {
                allBooks.push({
                    title: $(this).find('title').text(),
                    author: $(this).find('author').text(),
                    genre: $(this).find('genre').text(),
                    price: parseFloat($(this).find('price').text()),
                    date: $(this).find('publish_date').text()
                });
            });
            // Show all books on initial load
            displayBooks(allBooks);
        }
    });

    // 2. Display Function
    function displayBooks(data) {
        let rows = '';
        data.forEach(book => {
            rows += `<tr>
                <td>${book.title}</td>
                <td>${book.author}</td>
                <td>${book.genre}</td>
                <td>${book.price}</td>
                <td>${book.date}</td>
            </tr>`;
        });
        $('#bookTable tbody').html(rows);
    }

    // 3. Filter Button Logic
    $('#applyFilter').click(function() {
        const genre = $('#genreFilter').val();
        const author = $('#authorInput').val().toLowerCase();
        const maxPrice = parseFloat($('#priceInput').val());

        const filtered = allBooks.filter(book => {
            const matchGenre = (genre === "All" || book.genre === genre);
            const matchAuthor = book.author.toLowerCase().includes(author);
            const matchPrice = isNaN(maxPrice) || book.price <= maxPrice;
            
            return matchGenre && matchAuthor && matchPrice;
        });

        displayBooks(filtered);
    });
});