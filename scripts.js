// REVIEW SECTION
function createReviewSlide(review) {
    const { image, name, business, review: reviewText, source, date } = review;

    const slide = $('<div>').addClass('carousel-item');
    const row = $('<div>').addClass('row mx-auto align-items-center').appendTo(slide);
    const imgCol = $('<div>').addClass('col-12 col-sm-2 col-lg-2 offset-lg-1 d-flex justify-content-center').appendTo(row);
    const img = $('<img>').attr({
        'src': image,
        'alt': 'Reviewer Pic'
    }).addClass('d-block align-self-center').appendTo(imgCol);
    const textCol = $('<div>').addClass('col-12 col-sm-7 offset-sm-2 col-lg-9 offset-lg-0').appendTo(row);
    const reviewDiv = $('<div>').addClass('review-text').appendTo(textCol);
    const p = $('<p>').addClass('text-white').text(reviewText).appendTo(reviewDiv);
    const h4 = $('<h4>').addClass('text-white font-weight-bold').text(name).appendTo(reviewDiv);
    if (business) {
        const span = $('<span>').addClass('text-white').text(business).appendTo(reviewDiv);
    }
	const src = $('<span>').addClass('text-muted').text(source).appendTo(reviewDiv); // Source
	const spaceSpan = $('<span>').addClass('text-muted').text(' ').appendTo(reviewDiv); // Space
	const dt = $('<span>').addClass('text-muted').text(date).appendTo(reviewDiv); // Date


    return slide;
}

$(function () {
    let loader = $('.loader');
    loader.show();

    $.get("https://woodsontd.github.io/The-Velvet-Willow/reviews.json", function (data) {
        loader.hide();
        $('#reviewCarouselControls .carousel-inner').empty();

        data.forEach((review, index) => {
            let slide = createReviewSlide(review);
            if (index === 0) {
                slide.addClass('active');
            }
            $('#reviewCarouselControls .carousel-inner').append(slide);
        });
    });
});


