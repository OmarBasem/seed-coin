import {Button, Table} from "semantic-ui-react";
import Link from 'next/link';

import Layout from "../../../../components/Layout";
import Campaign from "../../../../ethereum/contracts/Campaign/campaign";
import RequestRow from "../../../../components/RequestRow";

async function getInitialProps(props) {
    const { address } = props.query;
    const campaign = Campaign(address);
    const xx = await campaign.methods;
    const requestsCount = await campaign.methods.getRequestsCount().call();
    const approversCount = await campaign.methods.approversCount().call();
    const requests = await Promise.all(
        Array(parseInt(requestsCount)).fill(null).map(async (element, index) => {
            const request = await campaign.methods.requests(index).call();
            return Object.entries(request).reduce((acc, [key, value]) => {
                acc[key] = typeof value === 'bigint' ? value.toString() : value;
                return acc;
            }, {});
        })
    );
    return { address, requests, requestsCount: requestsCount.toString(), approversCount: approversCount.toString()};
}



function RequestIndex(props) {
    const {Header, Row, HeaderCell, Body} = Table;
    const renderRows = () => {
        return props.requests.map((request, index) => {
            return <RequestRow key={index} id={index} request={request} address={props.address} approversCount={props.approversCount}/>;
        });
    }
    return (
        <Layout>
            <h3>Requests</h3>
            <Link href={`/campaigns/${props.address}/requests/new`}>
                <Button primary floated="right" style={{marginBottom: 10}}>Add Request</Button>
            </Link>
            <Table>
                <Header>
                    <Row>
                        <HeaderCell>ID</HeaderCell>
                        <HeaderCell>Description</HeaderCell>
                        <HeaderCell>Amount</HeaderCell>
                        <HeaderCell>Recipient</HeaderCell>
                        <HeaderCell>Approval Count</HeaderCell>
                        <HeaderCell>Approve</HeaderCell>
                        <HeaderCell>Finalize</HeaderCell>
                    </Row>
                </Header>
                <Body>
                    {renderRows()}
                </Body>
            </Table>
            <div>Found {props.requestsCount} requests.</div>
        </Layout>
    );
}

RequestIndex.getInitialProps = getInitialProps;

export default RequestIndex;
