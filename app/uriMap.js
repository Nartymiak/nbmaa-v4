var uriMap =
    {
        'paths': [
            {
                'path': 'exhibitions',
                'parentPath': null,
                'view': 'exhibition-parent',
                'childView': 'exhibition',
                'title' : 'Exhibitions'
            },
            {
                'path': 'current',
                'parentPath': 'exhibitions',
                'view': 'exhibition-sub-cat',
                'childView': 'exhibition',
                'title' : 'Current Exhibitions'
            },
            {
                'path': 'upcoming',
                'parentPath': 'exhibitions',
                'view': 'exhibition-sub-cat',
                'childView': 'exhibition',
                'title' : 'Upcoming Exhibitions'
            },
            {
                'path': 'previous',
                'parentPath': 'exhibitions',
                'view': 'exhibition-sub-cat',
                'childView': 'exhibition',
                'title' : 'Previous Exhibitions'
            },
            {
                'path': 'calendar',
                'parentPath': null,
                'view': 'calendar',
                'childView': 'program',
                'title' : 'Calendar'
            },
            {
                'path': 'adult-program',
                'parentPath': 'calendar',
                'view': 'sub-cat-page',
                'childView': 'program',
                'title' : 'Adult Program'
            },
            {
                'path': 'adult-studio',
                'parentPath': 'adult-program',
                //'parentPath': 'education-department',
                'view': 'sub-cat-page',
                'childView': 'program',
                'title' : 'Adult Studio'
            },
            {
                'path': 'adult-studio-class',
                'parentPath': 'adult-studio',
                'view': 'sub-cat-page',
                'childView': 'program',
                'title' : 'Adult Studio Class'
            },
            {
                'path': 'adult-studio-workshop',
                'parentPath': 'adult-studio',
                'view': 'sub-cat-page',
                'childView': 'program',
                'title' : 'Adult Studio Workshop'
            },
            {
                'path': 'lecture',
                'parentPath': 'adult-program',
                'view': 'sub-cat-page',
                'childView': 'program',
                'title' : 'Lecture'
            },
            {
                'path': 'an-evening-with',
                'parentPath': 'lecture',
                'view': 'sub-cat-page',
                'childView': 'program',
                'title' : 'An Evening With...'
            },
            {
                'path': 'day-of-learning',
                'parentPath': 'lecture',
                'view': 'sub-cat-page',
                'childView': 'program',
                'title' : 'Day of Learning'
            },
            {
                'path': 'gallery-talk',
                'parentPath': 'lecture',
                'view': 'sub-cat-page',
                'childView': 'program',
                'title' : 'Gallery Talk'
            },
            {
                'path': 'art-and-literature',
                'parentPath': 'adult-program',
                'view': 'sub-cat-page',
                'childView': 'program',
                'title' : 'Art and Literature'
            },
            {
                'path': 'film-screening',
                'parentPath': 'adult-program',
                'view': 'sub-cat-page',
                'childView': 'program',
                'title' : 'Film Screening'
            },
            {
                'path': 'fitness',
                'parentPath': 'adult-program',
                'view': 'sub-cat-page',
                'childView': 'program',
                'title' : 'Fitness'
            },
            {
                'path': 'teacher-program',
                'parentPath': 'adult-program',
                //'parentPath': 'education-department',
                'view': 'sub-cat-page',
                'childView': 'program',
                'title' : 'Teacher Program'
            },
            {
                'path': 'tour',
                'parentPath': 'adult-program',
                //'parentPath': 'education-department',
                'view': 'sub-cat-page',
                'childView': 'program',
                'title' : 'Tour'
            },
            {
                'path': 'up-close-tour',
                'parentPath': 'adult-program',
                //'parentPath': 'education-department',
                'view': 'sub-cat-page',
                'childView': 'program',
                'title' : 'Up Close Tour'
            },
            {
                'path': 'travel',
                'parentPath': 'adult-program',
                'view': 'sub-cat-page',
                'childView': 'program',
                'title' : 'Travel'
            },
            {
                'path': 'family-program',
                'parentPath': 'calendar',
                'view': 'sub-cat-page',
                'childView': 'program',
                'title' : 'Family Programs'
            },
            {
                'path': 'nurture-through-art',
                'parentPath': 'family-program',
                //'parentPath': 'education-department',
                'view': 'nurture-through-art',
                'childView': 'program',
                'title' : 'Nurture Through Art'
            },
            {
                'path': 'museum-and-me',
                'parentPath': 'nurture-through-art',
                'view': 'sub-cat-page',
                'childView': 'program',
                'title' : 'Museum and Me'
            },
            {
                'path': 'museum-and-me-too',
                'parentPath': 'nurture-through-art',
                'view': 'sub-cat-page',
                'childView': 'program',
                'title' : 'Museum and Me Too'
            },
            {
                'path': 'art-start-for-preschoolers',
                'parentPath': 'nurture-through-art',
                'view': 'sub-cat-page',
                'childView': 'program',
                'title' : 'Art Start For Preschoolers'
            },
            {
                'path': 'art-explorers',
                'parentPath': 'nurture-through-art',
                'view': 'sub-cat-page',
                'childView': 'program',
                'title' : 'Art Explorers'
            },
            {
                'path': 'art-adventures',
                'parentPath': 'nurture-through-art',
                'view': 'sub-cat-page',
                'childView': 'program',
                'title' : 'Art Adventures'
            },
            {
                'path': 'studio-at-4',
                'parentPath': 'nurture-through-art',
                'view': 'sub-cat-page',
                'childView': 'program',
                'title' : 'Studio at 4'
            },
            {
                'path': 'youth-drawing-101',
                'parentPath': 'nurture-through-art',
                'view': 'sub-cat-page',
                'childView': 'program',
                'title' : 'Youth Drawing 101'
            },
            {
                'path': 'teen-studio',
                'parentPath': 'nurture-through-art',
                'view': 'sub-cat-page',
                'childView': 'program',
                'title' : 'Teen Studio'
            },
            {
                'path': 'education-program',
                'parentPath': 'education-department',
                'view': 'sub-cat-page',
                'childView': 'default',
                'title' : 'General Education Program'
            },
            {
                'path': 'community-event',
                'parentPath': 'social-event',
                'view': 'sub-cat-page',
                'childView': 'program',
                'title' : 'Community Event'
            },
            {
                'path': 'homeschool-days',
                'parentPath': 'family-program',
                //'parentPath': 'education-department',
                'view': 'homeschool-day',
                'childView': 'program',
                'title' : 'Homeschool Days'
            },
            {
                'path': 'family-day',
                'parentPath': 'family-program',
                //'parentPath': 'education-department',
                'view': 'sub-cat-page',
                'childView': 'program',
                'title' : 'Family Day'
            },
            {
                'path': 'social-event',
                'parentPath': 'calendar',
                'view': 'sub-cat-page',
                'childView': 'program',
                'title' : 'Social Event'
            },
            {
                'path': 'community-day',
                'parentPath': 'social-event',
                'view': 'sub-cat-page',
                'childView': 'program',
                'title' : 'Community Day'
            },
            {
                'path': 'first-friday',
                'parentPath': 'social-event',
                'view': 'sub-cat-page',
                'childView': 'program',
                'title' : 'First Friday'
            },
            {
                'path': 'museum-after-dark',
                'parentPath': 'social-event',
                'view': 'sub-cat-page',
                'childView': 'program',
                'title' : 'Museum After Dark'
            },
            {
                'path': 'open-mic-night',
                'parentPath': 'social-event',
                'view': 'sub-cat-page',
                'childView': 'program',
                'title' : 'Open Mic Night'
            },
            {
                'path': 'pop-up-market',
                'parentPath': 'social-event',
                'view': 'sub-cat-page',
                'childView': 'program',
                'title' : 'Pop Up Market'
            },{
                'path': 'pop-up-bar',
                'parentPath': 'social-event',
                'view': 'sub-cat-page',
                'childView': 'program',
                'title' : 'Pop Up Bar'
            },
            {
                'path': 'musical-event',
                'parentPath': 'social-event',
                'view': 'sub-cat-page',
                'childView': 'program',
                'title' : 'Musical Event'
            },
            {
                'path': 'sunday-music-series',
                'parentPath': 'social-event',
                'view': 'sub-cat-page',
                'childView': 'program',
                'title' : 'Sunday Music Series'
            },
            {
                'path': 'opening-reception',
                'parentPath': 'calendar',
                'view': 'sub-cat-page',
                'childView': 'program',
                'title' : 'Opening Reception'
            },
            {
                'path': 'special-event',
                'parentPath': 'calendar',
                'view': 'sub-cat-page',
                'childView': 'program',
                'title' : 'Special Event'
            },
            {
                'path': 'volunteers-and-members',
                'parentPath': 'calendar',
                'view': 'sub-cat-page',
                'childView': 'program',
                'title' : 'Volunteers and Members'
            },
            {
                'path': 'members-only',
                'parentPath': 'volunteers-and-members',
                'view': 'sub-cat-page',
                'childView': 'program',
                'title' : 'Members Only'
            },
            {
                'path': 'volunteer-event',
                'parentPath': 'volunteers-and-members',
                'view': 'sub-cat-page',
                'childView': 'program',
                'title' : 'Volunteer Events'
            },
            {
                'path': 'parking-and-directions',
                'parentPath': null,
                'view': 'parking-and-directions',
                'childView': 'default',
                'title' : 'Parking and Directions'
            },
            {
                'path': 'about',
                'parentPath': null,
                'view': 'default',
                'childView': 'default',
                'title' : 'About'
            },
            {
                'path': 'collection',
                'parentPath': null,
                'view': 'collection',
                'childView': 'default',
                'title' : 'Collections Department'
            },
            {
                'path': 'emuseum',
                'parentPath': 'collection',
                'view': null,
                'outsideURL': 'http://ink.nbmaa.org:8080/emuseum/collections'
            },
            {
                'path': 'membership',
                'parentPath': null,
                'view': 'default',
                'childView': 'default',
                'title' : 'Membership'
            },
            {
                'path': 'cafe',
                'parentPath': null,
                'view': 'default',
                'title' : 'Caf&eacute;'
            },
            {
                'path': 'rent-the-museum',
                'parentPath': null,
                'view': 'default',
                'title' : 'Rent the Museum'
            },
            {
                'path': 'opportunities-for-artists',
                'parentPath': null,
                'view': 'default',
                'title' : 'Opportunities for Artists'
            },
            {
                'path': 'education-department',
                'parentPath': null,
                'view': 'education-department',
                'childView': 'default',
                'title' : 'Education Department'
            },
            {
                'path': 'donate',
                'parentPath': null,
                'view': 'nurture-through-art',
                'childView': 'default',
                'title' : 'Donate'
            }
        ]
    }
