export class PersonalCache {
  constructor(state = "local") {
    this.state = state;
  }

  save(ref, data, format = "json") {
    if (format == "json") return this.saveJson(ref, data);
  }

  get(ref, format = "json") {
    if (format == "json") return this.getJsonData(ref);
  }

  saveJson(ref, data) {
    let jsonData = JSON.stringify(data);
    if (this.state == "local") {
      localStorage.setItem(ref, jsonData)
    } else if (this.state == "session") {
      sessionStorage.setItem(ref, jsonData);
    }

    return data;
  }

  getJsonData(ref) {
    let data;
    if (this.state == "local") {
      data = localStorage.getItem(ref)
    } else if (this.state == "session") {
      data = sessionStorage.getItem(ref)
    }

    return JSON.parse(data);
  }
}


export default new PersonalCache();