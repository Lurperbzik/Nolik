interface IssueComment {
  author: string;
  body: string;
}

interface IssueJSON {
  distance: number;
  issue: {
    number: number;
    title: string;
    body: string;
    state: string;
    state_reason: string;
    url: string;
    author: string;
    comments: IssueComment[];
  };
}

export class Issue {
  public distance: number;
  public number: number;
  public title: string;
  public body: string;
  public url: string;
  public author: string;
  public state: string;
  public comments: IssueComment[];

  constructor(
    distance: number,
    number: number,
    title: string,
    body: string,
    url: string,
    author: string,
    state: string,
    comments: IssueComment[],
  ) {
    this.distance = distance;
    this.number = number;
    this.title = title;
    this.body = body;
    this.url = url;
    this.author = author;
    this.state = state;
    this.comments = comments;
  }

  static fromJSON(json: IssueJSON): Issue {
    return new Issue(
      json.distance,
      json.issue.number,
      json.issue.title,
      json.issue.body,
      json.issue.url,
      json.issue.author,
      json.issue.state,
      json.issue.comments,
    );
  }
}
