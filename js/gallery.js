/* ==================================================
   MURGABANI 1 TO 100 CLUB
   GALLERY JAVASCRIPT
================================================== */


/* ==================================================
   GALLERY DATA
================================================== */

const galleries = {


    /* ==============================================
       SARASWATI PUJA
    ============================================== */

    saraswati: {

        title:
            "🌸 Saraswati Puja",

        label:
            "RELIGIOUS • SINCE 2013",

        description:
            "Memories of our annual Saraswati Puja celebration.",

        folder:
            "images/Saraswati/",

        images: [

            "sp1.jpg",
            "sp2.jpg",
            "sp3.jpg",
            "sp9.jpg",
            "sp10.jpg",
            "sp6.jpg",
            "sp11.jpg",
            "sp12.jpg",
            "sp13.jpg",
            "sp15.jpg"

        ]

    },


    /* ==============================================
       KOJAGARI LAXMI PUJA
    ============================================== */

    laxmi: {

        title:
            "🪔 Kojagari Lakshmi Puja",

        label:
            "RELIGIOUS • SINCE 2020",

        description:
            "Memories of our Kojagari Lakshmi Puja celebrations.",

        folder:
            "images/Laxmi/",

        images: [

            "lp1.jpg",
            "lp7.jpg",
            "lp4.jpg",
            "lp6.jpg",
            "lp2.jpg",
            "lp13.jpg",
            "lp8.jpg",
            "lp12.jpg",
            "lp3.jpg",
            "sp15.jpg"

        ]

    },


    /* ==============================================
       SOCIAL ACTIVITIES
    ============================================== */

    activities: {

        title:
            "🌱 Social Activities",

        label:
            "COMMUNITY • SERVICE",

        description:
            "Memories of our social work and community activities.",

        folder:
            "images/Activities/",

        images: [

            "a0.jpg",
            "a4.jpg",
            "a5.jpg",
            "a7.jpg",
            "a3.jpg",
            "a9.jpg",
            "a8.jpg",
            "a1.jpg",
            "a2.jpg",
            "a6.jpg"

        ]

    }

};



/* ==================================================
   ELEMENTS
================================================== */

const categorySection =
    document.getElementById(
        "categorySection"
    );


const photoGallerySection =
    document.getElementById(
        "photoGallerySection"
    );


const photoGrid =
    document.getElementById(
        "photoGrid"
    );


const galleryTitle =
    document.getElementById(
        "galleryTitle"
    );


const galleryLabel =
    document.getElementById(
        "galleryLabel"
    );


const galleryDescription =
    document.getElementById(
        "galleryDescription"
    );


const backGalleryBtn =
    document.getElementById(
        "backGalleryBtn"
    );


const galleryViewer =
    document.getElementById(
        "galleryViewer"
    );


const viewerImage =
    document.getElementById(
        "viewerImage"
    );


const galleryClose =
    document.getElementById(
        "galleryClose"
    );



/* ==================================================
   CATEGORY BUTTONS
================================================== */

const categoryCards =
    document.querySelectorAll(
        ".category-card"
    );


categoryCards.forEach(
    function(card){

        card.addEventListener(
            "click",
            function(){

                const category =
                    card.dataset.gallery;

                showGallery(category);

            }
        );

    }
);



/* ==================================================
   SHOW GALLERY
================================================== */

function showGallery(category){


    const data =
        galleries[category];


    if(!data){

        console.error(
            "Gallery not found:",
            category
        );

        return;

    }


    /* Update heading */

    galleryTitle.textContent =
        data.title;


    galleryLabel.textContent =
        data.label;


    galleryDescription.textContent =
        data.description;



    /* Remove old images */

    photoGrid.innerHTML = "";



    /* Create image cards */

    data.images.forEach(
        function(imageName){

            const card =
                document.createElement(
                    "div"
                );


            card.className =
                "photo-card";


            const image =
                document.createElement(
                    "img"
                );


            image.src =
                data.folder +
                imageName;


            image.alt =
                data.title;


            image.loading =
                "lazy";


            /* Open fullscreen */

            image.addEventListener(
                "click",
                function(){

                    openViewer(
                        image.src,
                        image.alt
                    );

                }
            );


            card.appendChild(
                image
            );


            photoGrid.appendChild(
                card
            );

        }
    );



    /* Hide categories */

    categorySection.style.display =
        "none";


    /* Show gallery */

    photoGallerySection.style.display =
        "block";


    /* Move screen to top */

    window.scrollTo({

        top:0,

        behavior:"smooth"

    });

}



/* ==================================================
   BACK TO CATEGORIES
================================================== */

backGalleryBtn.addEventListener(
    "click",
    function(){

        photoGallerySection.style.display =
            "none";


        categorySection.style.display =
            "block";


        window.scrollTo({

            top:0,

            behavior:"smooth"

        });

    }
);



/* ==================================================
   OPEN FULLSCREEN VIEWER
================================================== */

function openViewer(
    imageSrc,
    imageAlt
){

    viewerImage.src =
        imageSrc;


    viewerImage.alt =
        imageAlt;


    galleryViewer.classList.add(
        "active"
    );


    galleryViewer.setAttribute(
        "aria-hidden",
        "false"
    );


    document.body.classList.add(
        "gallery-view-open"
    );

}



/* ==================================================
   CLOSE FULLSCREEN VIEWER
================================================== */

function closeViewer(){


    galleryViewer.classList.remove(
        "active"
    );


    galleryViewer.setAttribute(
        "aria-hidden",
        "true"
    );


    document.body.classList.remove(
        "gallery-view-open"
    );


    /*
       Clear image after closing
       to save memory.
    */

    setTimeout(
        function(){

            viewerImage.src = "";

        },
        300
    );

}



/* ==================================================
   CLOSE BUTTON
================================================== */

galleryClose.addEventListener(
    "click",
    function(){

        closeViewer();

    }
);



/* ==================================================
   CLICK OUTSIDE IMAGE TO CLOSE
================================================== */

galleryViewer.addEventListener(
    "click",
    function(event){

        if(
            event.target ===
            galleryViewer
        ){

            closeViewer();

        }

    }
);



/* ==================================================
   ESC KEY
================================================== */

document.addEventListener(
    "keydown",
    function(event){

        if(
            event.key === "Escape"
        ){

            closeViewer();

        }

    }
);