document.addEventListener("DOMContentLoaded", function () {

    /* =========================================
       EVENT DATA
    ========================================= */

    const eventData = {

        2026: [

            {
                name: "🌸 Saraswati Puja",

                date: "2026-01-23",

                venue: "MURGABANI 1 To 100 CLUB PREMISES",

                description:
                    "Our biggest annual celebration with devotion, cultural programmes and community participation.",

                nextYearMessage:
                    "Next year's Saraswati Puja date will be announced soon."
            },

            {
                name: "🪔 Kojagari Lakshmi Puja",

                date: "2026-10-25",

                venue: "MURGABANI HARI MANDIR PREMISES",

                description:
                    "A special festival organized by our club to preserve tradition and strengthen community unity.",

                nextYearMessage:
                    "Next year's Kojagari Lakshmi Puja date will be announced soon."
            }

        ],

        /*
         * Future years can be added here.
         *
         * Example:
         *
         * 2027: [
         *     {
         *         name: "🌸 Saraswati Puja",
         *         date: null,
         *         venue: "MURGABANI CLUB PREMISES",
         *         description: "...",
         *         nextYearMessage: "Date will be announced soon."
         *     }
         * ]
         */

    };


    /* =========================================
       CURRENT YEAR
    ========================================= */

    const today = new Date();

    const currentYear = today.getFullYear();


    /* =========================================
       YEAR TITLE
    ========================================= */

    const yearTitle = document.getElementById("events-year");

    yearTitle.textContent = currentYear + " Events";


    /* =========================================
       EVENT CONTAINER
    ========================================= */

    const container = document.getElementById("events-container");


    /* =========================================
       GET EVENTS FOR CURRENT YEAR
    ========================================= */

    let events = eventData[currentYear];


    /*
     * If the current year has not been added
     * to the database, show a message.
     */

    if (!events) {

        container.innerHTML = `
            <div class="event-card">

                <h3>📅 ${currentYear} Events</h3>

                <p>
                    Event dates for ${currentYear} will be announced soon.
                </p>

            </div>
        `;

        return;
    }


    /* =========================================
       CREATE EVENT CARDS
    ========================================= */

    events.forEach(function (event) {

        const card = document.createElement("div");

        card.className = "event-card";


        /* =====================================
           EVENT TITLE
        ===================================== */

        const title = document.createElement("h3");

        title.textContent = event.name;

        card.appendChild(title);


        /* =====================================
           DATE
        ===================================== */

        if (event.date) {

            const eventDate = new Date(event.date + "T00:00:00");


            const formattedDate = eventDate.toLocaleDateString(
                "en-IN",
                {
                    day: "numeric",
                    month: "long",
                    year: "numeric"
                }
            );


            const dateParagraph = document.createElement("p");

            dateParagraph.innerHTML =
                `<strong>📅 Date:</strong> ${formattedDate}`;

            card.appendChild(dateParagraph);


            /* =================================
               STATUS
            ================================= */

            const status = document.createElement("span");

            status.className = "event-status";


            /* =================================
               DATE COMPARISON
            ================================= */

            const todayDate = new Date(
                today.getFullYear(),
                today.getMonth(),
                today.getDate()
            );


            const targetDate = new Date(
                eventDate.getFullYear(),
                eventDate.getMonth(),
                eventDate.getDate()
            );


            const difference =
                targetDate.getTime() - todayDate.getTime();


            const daysDifference =
                Math.ceil(
                    difference / (1000 * 60 * 60 * 24)
                );


            /* =================================
               UPCOMING EVENT
            ================================= */

            if (daysDifference > 0) {

                status.classList.add("status-upcoming");

                status.textContent = "🟢 UPCOMING";

                card.appendChild(status);


                /* =============================
                   DAYS LEFT
                ============================= */

                const daysText = document.createElement("div");

                daysText.className = "days-left";


                if (daysDifference === 1) {

                    daysText.textContent =
                        "⏳ 1 day left";

                } else {

                    daysText.textContent =
                        `⏳ ${daysDifference} days left`;

                }


                card.appendChild(daysText);

            }


            /* =================================
               TODAY
            ================================= */

            else if (daysDifference === 0) {

                status.classList.add("status-upcoming");

                status.textContent = "🔴 TODAY";

                card.appendChild(status);


                const todayText = document.createElement("div");

                todayText.className = "days-left";

                todayText.textContent =
                    "🎉 The celebration is today!";

                card.appendChild(todayText);

            }


            /* =================================
               COMPLETED EVENT
            ================================= */

            else {

                status.classList.add("status-completed");

                status.textContent = "✓ COMPLETED";

                card.appendChild(status);


                /*
                 * Show next year's message
                 */

                if (event.nextYearMessage) {

                    const nextYearMessage =
                        document.createElement("div");

                    nextYearMessage.className =
                        "next-year-message";

                    nextYearMessage.textContent =
                        event.nextYearMessage;

                    card.appendChild(nextYearMessage);

                }

            }

        }


        /* =====================================
           VENUE
        ===================================== */

        const venueParagraph =
            document.createElement("p");

        venueParagraph.innerHTML =
            `<strong>📍 Venue:</strong> ${event.venue}`;

        card.appendChild(venueParagraph);


        /* =====================================
           DESCRIPTION
        ===================================== */

        const descriptionParagraph =
            document.createElement("p");

        descriptionParagraph.textContent =
            event.description;

        card.appendChild(descriptionParagraph);


        /* =====================================
           ADD CARD TO PAGE
        ===================================== */

        container.appendChild(card);

    });

});