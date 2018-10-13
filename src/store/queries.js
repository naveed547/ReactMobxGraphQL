import ApolloClient, { gql } from 'apollo-boost';
const token = `Bearer YOUR_GITHUB_PERSONAL_ACCESS_TOKEN`;
const client = new ApolloClient({
  uri: 'https://api.github.com/graphql',
  headers: {
    Authorization: token ? `Bearer ${token}`: '',
  },
});

export const GET_REPOS = gql`query($organization: String!) {
    repositoryOwner(login: $organization) {
        repositories(first: 10) {
            edges {
                node {
                    name
                    id
                }
            }
        }
    }
}`;

export const GET_ALLISSUES = gql`query($username: String!, $reponame: String!) {
    closedIssues:repository(owner:$username, name:$reponame) {
      issues(first: 100,states:CLOSED) {
        closed_count: totalCount
        items:edges {
          node {
            ...IssueFragment
          }
        }
      }
    }
    openIssues:repository(owner:$username, name:$reponame) {
        issues(last: 100,states:OPEN) {
            open_count: totalCount
            items:edges {
                node {
                    ...IssueFragment
                }
            }
        }
    }
  }
  fragment IssueFragment on Issue {
    number,
    state,
    title,
    updated_at: updatedAt,
    comments {
        total_count: totalCount
    },
    closed_at: closedAt,
    repository_url: url,
    user: author {
        login
    }
  }`;
export const GET_OPENISSUES = gql`query($username: String!, $reponame: String!) {
    repository(owner:$username, name:$reponame) {
        issues(states:OPEN) {
            totalCount
        }
    }
}`;
export const GET_SINGLEISSUE = gql`query($username: String!, $reponame: String!,$issuenumber: Int!) {
    repository(owner:$username, name:$reponame) {
      issue(number: $issuenumber) {
        id,
        title,
        state,
        number,
        updated_at: updatedAt,
        closed_at: closedAt,
        repository_url: url,
        user: author {
            login
        }
      }
    }
}`;
export default client;