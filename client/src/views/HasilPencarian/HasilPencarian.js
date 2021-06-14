import React, { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
import queryString from "query-string";
import axios from "axios";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  FormGroup,
  Label,
  Input,
} from "reactstrap";

// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";

export default function HasilPencarian(props) {
  const [modal, setModal] = useState(false);
  const [data, setData] = useState([]);
  const [dummy, setDummy] = useState(false);
  const [mahasiswa, setMahasiswa] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);

  const usersPerPage = 9;
  const pagesVisited = pageNumber * usersPerPage;

  const pageCount = Math.ceil(data.length / usersPerPage);

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  const toggle = (npm) => {
    axios
      .get(`https://datma-backend.herokuapp.com/api/datma/${npm}`)
      .then((response) => {
        console.log(response.data.data);
        setMahasiswa(response.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
    setModal(!modal);
  };
  const handlerAngkatan = (angkatan) => {
    window.location.href = "hasilPencarian?query=" + angkatan;
  };
  const handlerProdi = (prodi) => {
    window.location.href = "hasilPencarian?query=" + prodi;
  };
  useEffect(() => {
    let path = props.location.search;
    let params = queryString.parse(path);
    console.log(params.prodi);

    if (params.query) {
      axios
        .get(
          `https://datma-backend.herokuapp.com/api/search/?search=${params.query}`
        )
        .then((response) => {
          console.log();
          if (response.data.message === "Show all Data Mahasiswa") {
            setData(response.data.data);
          } else {
            setDummy(response.data.data);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      axios
        .get(
          `https://datma-backend.herokuapp.com/api/datma/?nama=${params.nama}&prodi=${params.prodi}&angkatan=${params.angkatan}&keahlian=${params.keahlian}`
        )
        .then((response) => {
          console.log(response.data.data);
          setData(response.data.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);

  return (
    <>
      <GridContainer>
        {data != "" ? (
          data.slice(pagesVisited, pagesVisited + usersPerPage).map((e) => (
            <GridItem key={e.npm} xs={12} sm={4} md={4} lg={4}>
              <div className="card mt-3 " style={{ width: "100%" }}>
                <img
                  className="card-img-top"
                  src={e.urlFoto}
                  alt="Card image cap"
                  height="450px"
                />
                <div className="card-body">
                  <h5 className="card-title text-center">{e.nama}</h5>
                  <p className="card-text text-center">
                    {e.npm} <br></br>
                    {e.prodi}
                  </p>
                  <div className="d-flex justify-content-end">
                    <a
                      onClick={() => toggle(e.npm)}
                      href="#"
                      className="btn btn-primary "
                    >
                      Detail
                    </a>
                  </div>
                </div>
              </div>
            </GridItem>
          ))
        ) : (
          <p className="ml-3">Data tidak ditemukan...</p>
        )}
        <div>
          {mahasiswa ? (
            <Modal isOpen={modal} toggle={toggle}>
              <ModalHeader toggle={toggle}>
                {" "}
                <strong className="text-center">
                  Informasi Mahasiswa
                </strong>{" "}
              </ModalHeader>
              <ModalBody>
                <FormGroup>
                  <Label for="exampleNama">Nama</Label>
                  <Input
                    value={mahasiswa.nama}
                    disabled
                    type="text"
                    name="nama"
                    id="exampleName"
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="examplettLahir">Tempat dan Tanggal Lahir</Label>
                  <Input
                    disabled
                    type="text"
                    name="ttLahir"
                    id="examplettLahir"
                    value={mahasiswa.ttLahir}
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="exampleNPM">NPM</Label>
                  <Input
                    disabled
                    type="text"
                    name="NPM"
                    id="exampleNPM"
                    value={mahasiswa.npm}
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="exampleAngkatan">Angkatan</Label>
                  <Input
                    disabled
                    type="text"
                    name="angkatan"
                    id="exampleAngkatan"
                    value={mahasiswa.angkatan}
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="exampleProdstud">Program Studi</Label>
                  <Input
                    disabled
                    type="text"
                    name="prodtud"
                    id="exampleProdstud"
                    value={mahasiswa.prodi}
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="exampleAngkatan">Bidang Minat</Label>
                  <Input
                    disabled
                    type="text"
                    name="bidangMinat"
                    id="exampleBidangMinat"
                    value={mahasiswa.keahlian}
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="exampleJeniskelamin">Jenis Kelamin</Label>
                  <Input
                    disabled
                    type="text"
                    name="jeniskelamin"
                    id="exampleJeniskelamin"
                    value={mahasiswa.jk}
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="exampleNoHP">No HP</Label>
                  <Input
                    disabled
                    type="text"
                    name="noHP"
                    id="exampleNoHP"
                    value={mahasiswa.noHP}
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="exampleAgama">Agama</Label>
                  <Input
                    disabled
                    type="text"
                    name="agama"
                    id="exampleAgama"
                    value={mahasiswa.agama}
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="exampleEmail">Email</Label>
                  <Input
                    disabled
                    type="email"
                    name="email"
                    id="exampleEmail"
                    value={mahasiswa.email}
                  />
                </FormGroup>

                <FormGroup>
                  <Label for="exampleTextarea">Alamat</Label>
                  <Input
                    disabled
                    type="textarea"
                    name="alamat"
                    id="exampleAlamat"
                    value={mahasiswa.alamat}
                  />
                </FormGroup>
              </ModalBody>
              <ModalFooter>
                <Button color="secondary" onClick={toggle}>
                  back
                </Button>
              </ModalFooter>
            </Modal>
          ) : (
            dummy
          )}
        </div>
        <ReactPaginate
          previousLabel={"previous"}
          nextLabel={"next"}
          pageCount={pageCount}
          onPageChange={changePage}
          containerClassName={"paginationBttns"}
          previousLinkClassName={"previousBttn"}
          nextLinkClassName={"nextBttn"}
          disabledClassName={"paginationDisabled"}
          activeClassName={"paginationActive"}
        />
      </GridContainer>
      <h1 style={{ fontSize: "25px" }} className="my-3 mx-3 ">
        Prodi Lainnya
      </h1>
      <div className="row">
        <div className="col-6">
          <div
            className="card text-white bg-info mb-3"
            style={{ maxWidth: "100%" }}
            onClick={() => handlerProdi("biologi")}
          >
            <div className="card-header">Biologi</div>
          </div>
          <div
            className="card text-white bg-info mb-3"
            style={{ maxWidth: "100%" }}
            onClick={() => handlerProdi("fisika")}
          >
            <div className="card-header">Fisika</div>
          </div>
          <div
            className="card text-white bg-info mb-3"
            style={{ maxWidth: "100%" }}
            onClick={() => handlerProdi("matematika")}
          >
            <div className="card-header">Matematika</div>
          </div>
          <div
            className="card text-white bg-info mb-3"
            style={{ maxWidth: "100%" }}
            onClick={() => handlerProdi("teknik informatika")}
          >
            <div className="card-header">Teknik Informatika</div>
          </div>
          <div
            className="card text-white bg-info mb-3"
            style={{ maxWidth: "100%" }}
            onClick={() => handlerProdi("teknik elektro")}
          >
            <div className="card-header">Teknik Elektro</div>
          </div>
        </div>
        <div className="col-6">
          <div
            className="card text-white bg-info mb-3"
            style={{ maxWidth: "100%" }}
            onClick={() => handlerProdi("aktuaria")}
          >
            <div className="card-header">Aktuaria</div>
          </div>
          <div
            className="card text-white bg-info mb-3"
            style={{ maxWidth: "100%" }}
            onClick={() => handlerProdi("statistika")}
          >
            <div className="card-header">Statistika</div>
          </div>
          <div
            className="card text-white bg-info mb-3"
            style={{ maxWidth: "100%" }}
            onClick={() => handlerProdi("kimia")}
          >
            <div className="card-header">Kimia</div>
          </div>
          <div
            className="card text-white bg-info mb-3"
            style={{ maxWidth: "100%" }}
            onClick={() => handlerProdi("geofisika")}
          >
            <div className="card-header">Geofisika</div>
          </div>
        </div>
      </div>
      <h1 style={{ fontSize: "25px" }} className="my-3 mx-3 ">
        Angkatan Lainnya
      </h1>
      <div>
        <div
          className="card text-white bg-primary mb-3"
          onClick={() => handlerAngkatan("2018")}
          style={{ maxWidth: "18rem" }}
        >
          <div className="card-header">2018</div>
        </div>
        <div
          className="card text-white bg-success mb-3"
          style={{ maxWidth: "18rem" }}
          name="2019"
          onClick={() => handlerAngkatan("2019")}
        >
          <div className="card-header">2019</div>
        </div>
        <div
          className="card text-white bg-danger mb-3"
          style={{ maxWidth: "18rem" }}
          name="2020"
          onClick={() => handlerAngkatan("2020")}
        >
          <div className="card-header">2020</div>
        </div>
        <div
          className="card text-white bg-warning mb-3"
          style={{ maxWidth: "18rem" }}
          name="2021"
          onClick={() => handlerAngkatan("2021")}
        >
          <div className="card-header">2021</div>
        </div>
      </div>
    </>
  );
}
