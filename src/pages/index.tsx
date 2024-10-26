import {Card, Button} from "semantic-ui-react";
import factory from "../ethereum/factory";
import Layout from "../components/Layout";
import Link from 'next/link';


async function getInitialProps() {
    const campaigns = await factory.methods.getDeployedCampaigns().call();
    return {campaigns};
}

function CampaignIndex(props) {
    const renderCampaigns = () => {
        const items = props.campaigns.map((address) => {
            return {
                header: address,
                description: <Link href={`/campaigns/${address}`}>View Campaign</Link>,
                fluid: true,
            };
        });

        return <Card.Group items={items}/>;
    }
    return (
        <Layout>
            <div>
                <h3>Open Campaigns</h3>
                <Link href="/campaigns/new">
                <Button
                    content="Create Campaign"
                    icon="add circle"
                    primary
                    floated="right"
                />
                </Link>
                {renderCampaigns()}
            </div>
        </Layout>
    )

}

CampaignIndex.getInitialProps = getInitialProps;

export default CampaignIndex;
