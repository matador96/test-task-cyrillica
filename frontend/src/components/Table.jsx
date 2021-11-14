import React from "react";
import { Table, Col, Spinner, Row, Label, Input, Badge } from "reactstrap";
import ReactDOM from "react-dom";
import { getVotesList } from "../api/votes";

const DEFAULT_VALUE_SELECT = "choose";
const spinnerDiv = document.getElementById("spinner-root");

export default class TableData extends React.Component {
  constructor() {
    super();
    this.state = {
      table: [],
      cachedTable: [],
      languages: [],
      activeLanguage: DEFAULT_VALUE_SELECT,
      fetching: false,
    };
    this.portalEl = document.createElement("div");
  }

  componentDidMount() {
    this.getData();
    spinnerDiv.appendChild(this.portalEl);
  }

  componentWillUnmount() {
    spinnerDiv.removeChild(this.portalEl);
  }

  async sortData() {
    const { activeLanguage, cachedTable } = this.state;

    this.setState({
      table: cachedTable.filter((item) => item.language === activeLanguage),
    });
  }

  getData() {
    this.setState({ fetching: true }, () => {
      getVotesList()
        .then(({ data }) => {
          const languages = new Set();

          for (let item of data) {
            languages.add(item.language);
          }

          this.setState({
            table: data,
            cachedTable: data,
            fetching: false,
            languages: Array.from(languages),
          });
        })
        .catch((error) => {
          console.log(error);
          return error;
        });
    });
  }

  handleChangeSelect = (e) => {
    const { activeLanguage } = this.state;
    const choosedLanguage = e.target.value;
    if (activeLanguage === choosedLanguage) return;
    this.setState({ activeLanguage: choosedLanguage }, () => this.sortData());
  };

  render() {
    const { fetching, table, languages, activeLanguage } = this.state;

    return (
      <>
        <Row>
          <Col
            xs={6}
            md={{
              offset: 3,
              size: 6,
            }}
          >
            <Row style={{ margin: "20px 0" }}>
              <Label for="exampleSelect" sm={2}>
                Select language
              </Label>
              <Col sm={4}>
                <Input
                  id="exampleSelect"
                  name="select"
                  type="select"
                  value={activeLanguage}
                  defaultValue={DEFAULT_VALUE_SELECT}
                  onChange={this.handleChangeSelect}
                >
                  <option value={DEFAULT_VALUE_SELECT} disabled>
                    Choose language ...
                  </option>
                  {languages.map((item) => (
                    <option value={item}>{item}</option>
                  ))}
                </Input>
              </Col>
            </Row>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>id</th>
                  <th>name</th>
                  <th>sex</th>
                  <th>provider</th>
                  <th>language</th>
                  <th>providerLanguage</th>
                  <th>flags</th>
                </tr>
              </thead>

              {fetching ? (
                <>
                  {ReactDOM.createPortal(
                    <div className="spinner-fullarea">
                      <Spinner />
                    </div>,
                    this.portalEl
                  )}
                </>
              ) : (
                <tbody>
                  {table.map((list) => (
                    <tr>
                      <td>{list.id}</td>
                      <td>{list.name}</td>
                      <td>{list.sex}</td>
                      <td>{list.provider}</td>
                      <td>{list.language}</td>
                      <td>{list.providerLanguage}</td>
                      <td>
                        {list.flags.map((flag) => (
                          <Badge color="primary">{flag}</Badge>
                        ))}
                      </td>
                    </tr>
                  ))}
                </tbody>
              )}
            </Table>
          </Col>
        </Row>
      </>
    );
  }
}
