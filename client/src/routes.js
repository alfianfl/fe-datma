import LibraryBooks from "@material-ui/icons/LibraryBooks";
// core components/views for Admin layout
import DataList from "views/DataList/DataList.js";
import AboutUs from "views/AboutUs/AboutUs.js";
import HasilPencarian from "views/HasilPencarian/HasilPencarian";

const dashboardRoutes = [
  {
    path: "/dataMahasiswa",
    name: "Data Mahasiswa",
    icon: "content_paste",
    component: DataList,
    layout: "/admin",
  },
  {
    path: "/aboutUs",
    name: "About Us",
    icon: LibraryBooks,
    component: AboutUs,
    layout: "/admin",
  },
  {
    path: "/hasilPencarian",
    name: "Hasil Pencarian",
    icon: LibraryBooks,
    component: HasilPencarian,
    layout: "/admin",
  },
];

export default dashboardRoutes;
