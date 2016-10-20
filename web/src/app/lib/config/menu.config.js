var node = [
    {
        title: 'Students',
        icon: 'fa fa-dashboard fa-fw ',
        link: '#',
        childNodes: [
            { title: 'liste', link: './#students' },
            { title: 'attendances', link: './#students/attendance' },
            { title: 'scolarships', link: './#students/scholarships' },
            { title: 'Statistic', link: './#students/statistic' },
        ]
    },
    {
        title: 'Admission',
        icon: 'fa fa-dashboard fa-fw ',
        link: '#',
        childNodes: [
            { title: 'Student list', link: './#students/admissions' },
            { title: 'New admission', link: './#students/admissions/add' },
        ]
    },
    {
        title: 'Enrollments',
        icon: 'fa fa-dashboard fa-graduation-cap  ',
        link: '#',
        childNodes: [
            { title: 'list of enrolled students', link: './#enrollments' },
            { title: 'Enroll a student', link: './#enrollments/enroll' },
            { title: 'Statistic', link: './#enrollments/statistic' },
        ]
    },
    {
        title: 'Student groups',
        icon: 'fa fa-users fa-fw ',
        link: '#',
        childNodes: [
            { title: 'List of groups', link: './#studentsgroups' },
            { title: 'New Group', link: './#studentsgroups/create' },
        ]
    },
    {
        title: 'Student financial aid',
        icon: 'fa fa-money',
        link: '#',
        childNodes: [
            { title: 'List of reductions', link: './#reductions' },
            { title: 'New Reduction', link: './#reduction/create' },
        ]
    },
    {
        title: 'Finance',
        icon: 'fa  fa-money',
        link: '#',
        childNodes: [
            { title: 'Tuition Balance', link: './#finance/tuitions' },
            { title: 'Tuitions Statistic', link: './#finance/tuition' },
            { title: 'Payments plans', link: './#finance/payment plan' },
        ]
    },
    {
        title: 'Grades',
        icon: 'fa  fa-pencil-square ',
        link: '#',
        childNodes: [
            { title: 'Enter grades', link: './#grades/enter' },
            { title: 'Students grades', link: './#grades' },
        ]
    },
    {
        title: 'Teachers',
        icon: 'fa fa-dashboard fa-fw ',
        link: '#',
        childNodes: [
            { title: 'New teacher', link: './#teachers/Create' },
            { title: 'Teachers list', link: './#teachers' },
            { title: 'Teachers courses', link: './#teachers-courses' },
        ]
    },
    {
        title: 'Employees',
        icon: 'fa fa-dashboard fa-fw ',
        link: '#',
        childNodes: [
            { title: 'Users', link: './#students' },
            { title: 'Users groups', link: './#students/add' },
            { title: 'Roles', link: './#students/add' },
        ]
    },
    {
        title: 'School',
        icon: 'fafa-cogs fa-fw ',
        link: '#',
        childNodes: [
            { title: 'information', link: './#school-information' },
        ]
    },
    {
        title: 'Academic years',
        icon: 'fa fa-cogs fa-fw ',
        link: '#',
        childNodes: [
            { title: 'change current academic year', link: './#academic-years/current' },
            { title: 'create academic year', link: './#academic-years/create' },
            { title: 'list of acade￼mic years', link: './#academic-years' },
        ]
    },
    {
        title: 'Classes',
        icon: 'fa fa-cogs fa-fw ',
        link: '#',
        childNodes: [
            { title: 'create', link: './#classes/create' },
            { title: 'list of classes ', link: './#classes' },
        ]
    },
    {
        title: 'Levels',
        icon: 'fa fa-cogs fa-fw ',
        link: '#',
        childNodes: [
            { title: 'create', link: './#studylevels/create' },
            { title: 'list of levels ', link: './#studylevels' },
        ]
    },
    {
        title: 'Subjects',
        icon: 'fa fa-cogs fa-fw ',
        link: './#subjects',

    },
    {
        title: 'Fee heads',
        icon: 'fa fa-cogs fa-fw ',
        link: './#feeheads',

    }

];

export default node;
