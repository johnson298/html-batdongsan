
$(document).ready(function () {
    console.log('slksdl')
    const $body = $('body');
    const $input = $('.upload__inputFile')
    const $boxDrop = $('#s-drop-img');
    let imgWrap = "";
    let imgArray = [];
    let index = 0;


    $boxDrop.on('dragover', function(e) {
        e.preventDefault();
        $boxDrop.addClass('drag-over');
    });

    $boxDrop.on('dragleave', function() {
        $boxDrop.removeClass('drag-over');
    });

    $boxDrop.on('drop', function(e) {
        e.stopPropagation();
        e.preventDefault();
        $boxDrop.removeClass('drag-over');
        const files = e.originalEvent.dataTransfer.files;
        $input.prop('files', files)

        const event = $.Event('change')
        $input.trigger(event)
    })
    $input.each(async function () {
        $(this).on('change', async function (e) {
            try {
                setLoading(true)

                imgWrap = $('.upload__img-wrap');

                const files = e.target.files;
                const filesArr = Array.prototype.slice.call(files);

                const fileImages = filesArr.filter(file => file.type.match('image.*'))

                fileImages.forEach((file) => {
                    ++index;
                    const name = new Date().getTime() + index;
                    const url = URL.createObjectURL(file)
                    imgArray.push({
                        file: file.value,
                        name,
                        index,
                        url
                    });
                    const html = `<div class='upload__img-box'>
                                        <div data-number='${index}' data-file='${name}' class='img-bg drop-img-item'>
                                            <img src="${url}" alt="${url ? name : 'Lỗi'}">
                                            <div class='upload__img-close'></div>
                                        </div>
                                    </div>`;
                    imgWrap.append(html);
                })

                setLoading(false)
            } catch {
                setLoading(false)
            }
        });
    });

    $body.on('click', ".upload__img-close", function (e) {
        const file = $(this).parent().data("file");
        for (let i = 0; i < imgArray.length; i++) {
            if (imgArray[i].name === file) {
                imgArray.splice(i, 1);
                break;
            }
        }
        $(this).parent().parent().remove();
    });


    function setLoading(status) {
        const $el = $('#s-loading')
        $el.css('display', status ? 'flex' : 'none')
    }

});
