var totalImages = 24; // 总图片数量
var currentPage = 0; // 当前页面
var currentImageIndex = 0; // 当前显示图片的索引，从0开始

const nextButton = document.getElementById('nextButton');
const prevButton = document.getElementById('prevButton');
const frontButton = document.getElementById('frontButton');
const lastButton = document.getElementById('lastButton');
const imageContainer = document.querySelector('.image');
// 获取 URL 参数中的 currentImageIndex
const urlParams = new URLSearchParams(window.location.search);
const urlCurrentImageIndex = urlParams.get('currentImageIndex');

if (urlCurrentImageIndex) {
    currentImageIndex = parseInt(urlCurrentImageIndex, 10);
    updateImage(); // 更新图片
    updatePage();
}

nextButton.addEventListener('click', function() {
    currentImageIndex = (currentImageIndex + 1) % totalImages; // 计算下一张图片的索引
    updateImage();
    setTimeout(function() {
        updatePage();
    }, 250);
});

prevButton.addEventListener('click', function() {
    currentImageIndex = (currentImageIndex - 1 + totalImages) % totalImages; // 计算前一张图片的索引
    updateImage();
    setTimeout(function() {
        updatePage();
    }, 250);
});

frontButton.addEventListener('click', function() {
    currentImageIndex = 0;
    updateImage();
    setTimeout(function() {
        updatePage();
    }, 250);
});

lastButton.addEventListener('click', function() {
    currentImageIndex = 23;
    updateImage();
    setTimeout(function() {
        updatePage();
    }, 250);
});

// 新增左右点击事件
imageContainer.addEventListener('click', function(event) {
    const boundingBox = imageContainer.getBoundingClientRect();
    const clickX = event.clientX - boundingBox.left;
    const containerWidth = boundingBox.width;

    if (clickX < containerWidth / 2) {
        // 点击了左侧
        currentImageIndex = (currentImageIndex - 1 + totalImages) % totalImages;
    } else {
        // 点击了右侧
        currentImageIndex = (currentImageIndex + 1) % totalImages;
    }

    updateImage();
    setTimeout(function() {
        updatePage();
    }, 250);
});

function updateImage() {
    const nextImageSrc = `img/${currentImageIndex}.jpg`;
    imageContainer.src = nextImageSrc; // 更新大图的 src
    imageContainer.alt = `Large Image ${currentImageIndex}`; // 更新大图的 alt 文本
}

function updatePage() {
    if (currentImageIndex == 0) {
        document.getElementById('pageText').textContent = 'Cover Page';
    } else {
        currentPage = currentImageIndex;
        document.getElementById('pageText').textContent = 'Page ' + currentPage;
    }
}

function changePage() {
    var selectedPage = document.getElementById("pageSelector").value;
    currentImageIndex = selectedPage;
    updateImage();
    setTimeout(function() {
        updatePage();
    }, 250);
}
