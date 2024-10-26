import {Card, Grid, Button} from "semantic-ui-react";
import Campaign from "../../../ethereum/contracts/Campaign/campaign";
import web3 from "../../../ethereum/web3";
import Layout from "../../../components/Layout";
import ContributeForm from "../../../components/ContributeForm";
import Link from 'next/link';


async function getInitialProps(props) {
    const campaign = Campaign(props.query.address);
    const summary = await campaign.methods.getSummary().call();
    return {
        address: props.query.address,
        minimumContribution: summary[0],
        balance: summary[1],
        requestsCount: summary[2],
        approversCount: summary[3],
        manager: summary[4]
    };
}


function ShowCampaign(props) {
    const renderCards = () => {
        const {
            balance,
            manager,
            minimumContribution,
            requestsCount,
            approversCount
        } = props;
        const items = [
            {
                header: manager.toString(),
                meta: "Address of Manager",
                description: "The manager created this campaign and can create requests to withdraw money",
                style: {overflowWrap: 'break-word'}
            },
            {
                header: minimumContribution.toString(),
                meta: "Minimum Contribution (wei)",
                description: "You must contribute at least this much wei to become an approver",
            },
            {
                header: requestsCount.toString(),
                meta: "Number of Requests",
                description: "A request tries to withdraw money from the contract. Requests must be approved by approvers",
            },
            {
                header: approversCount.toString(),
                meta: "Number of Approvers",
                description: "Number of people who have already donated to this campaign",
            },
            {
                header: web3.utils.fromWei(balance, 'ether'),
                meta: "Campaign Balance (ether)",
                description: "The balance is how much money this campaign has left to spend",
            }
        ];

        return <Card.Group items={items}/>;
    }
    return (
        <Layout>
            <h1>Campaign show</h1>
            <Grid>
                <Grid.Row>
                    <Grid.Column width={10}>
                        {renderCards()}
                    </Grid.Column>
                    <Grid.Column width={6}>
                        <ContributeForm address={props.address}/>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column>
                        <Link href={`/campaigns/${props.address}/requests`}>
                            <Button primary>View Requests</Button>
                        </Link>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </Layout>
    )
}

ShowCampaign.getInitialProps = getInitialProps;

export default ShowCampaign;
