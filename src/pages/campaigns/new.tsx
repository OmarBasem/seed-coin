import Layout from "../../components/Layout";
import {Form, Input, Button, Message} from "semantic-ui-react";
import {useState} from "react";
import factory from "../../ethereum/factory";
import web3 from "../../ethereum/web3";
import { useRouter } from 'next/router';

function CampaignNew() {
    const [minimumContribution, setMinimumContribution] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const onSubmit = async event => {
        event.preventDefault();
        setLoading(true);
        setErrorMessage('');
        const accounts = await web3.eth.getAccounts();
        try {
            await factory.methods.createCampaign(minimumContribution).send({
                from: accounts[0]
            });
            router.push('/');
        } catch (error) {
            console.error("An error occurred during deployment:", error);
            setErrorMessage(error.message);
        }
        setLoading(false);
    }
    return (
        <Layout>
            <h1>New Campaign</h1>
            <Form onSubmit={onSubmit} error={!!errorMessage}>
                <Form.Field>
                    <label>Minimum Contribution</label>
                    <Input
                        label="wei"
                        labelPosition="right"
                        value={minimumContribution}
                        onChange={(event) => setMinimumContribution(event.target.value)}
                    />
                </Form.Field>
                <Message error header="Oops!" content={errorMessage}/>
                <Button loading={loading} primary>Create</Button>
            </Form>
        </Layout>
    )
}

export default CampaignNew;
