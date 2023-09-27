export default class JsonServer {
  static url = "http://localhost:3000/tasks";

  static async loadTasks() {
    return fetch(JsonServer.url)
      .then((response) => {
        //console.log('reponse statut : ', response.status);
        return response.json();
      })
      .then((tasks) => {
        //console.log(tasks);
        return tasks;
      })
      .catch((error) => {
        console.log("erreur : ", error);
      });
  }

  static async deleteTaskInDb(taskId) {
    return fetch(`${JsonServer.url}/${taskId}`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "DELETE",
    }).then(function (res) {
      //console.log(res);
      if(res.status !== 200) throw new Error("Erreur dans deleteRemoteTask");
    });
  }

  static async addTaskInDb(title) {
    return fetch(`${JsonServer.url}`, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
            "title": title,
            "done": false
        }),
        method: "POST",
      }).then(function (res) {
        console.log(res);
      });
  }

  static async changeDoneInDb(id, done) {
    return fetch(`${JsonServer.url}/${id}`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
          "done": done,
      }),
      method: "PATCH",
    }).then(function (res) {
      console.log(res);
    });
  }

  static async getTaskById(idTask) {
    return fetch(`${JsonServer.url}/${idTask}`)
      .then((response) => {
        //console.log('reponse statut : ', response.status);
        return response.json();
      })
      .then((task) => {
        //console.log(tasks);
        return task;
      })
      .catch((error) => {
        console.log("erreur : ", error);
      });
  }
}

/*
export default class JsonServer {
    static url = "http://localhost:3001/counters";

    static async loadCounters(){
        return fetch(JsonServer.url)
        .then(response => {
            console.log(status de mla reponse  : , response.status);
            return response.json();
        })
        .then(counters => {
             console.log(counter , counters);
             return counters;
        })
        .catch(error => {
            console.log(erreur attraper dans loader : + error);
        })
    }
}
*/
