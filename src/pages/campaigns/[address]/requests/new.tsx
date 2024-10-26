import {Form, Button, Message, Input} from "semantic-ui-react";
import {useState} from "react";
import Campaign from "../../../../ethereum/contracts/Campaign/campaign";
import web3 from "../../../../ethereum/web3";
import { useRouter } from 'next/router';
import Link from 'next/link';
import Layout from "../../../../components/Layout";

function getInitialProps(props) {
    const {address} = props.query;
    return {address};
}

function RequestNew(props) {
    const [value, setValue] = useState('');
    const [description, setDescription] = useState('');
    const [recipient, setRecipient] = useState('');
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const router = useRouter();
    const onSubmit = async event => {
        event.preventDefault();
        setLoading(true);
        setErrorMessage('');
        const campaign = Campaign(props.address);
        const accounts = await web3.eth.getAccounts();
        try {
            await campaign.methods.createRequest(description, web3.utils.toWei(value, 'ether'), recipient).send({
                from: accounts[0]
            });
            router.push(`/campaigns/${props.address}/requests`);
        } catch (error) {
            console.error("An error occurred during request creation:", error);
            setErrorMessage(error.message);
        }
        setLoading(false);
    }
    return (
        <Layout>
            <Link href={`/campaigns/${props.address}/requests`}>Back</Link>
            <h3>Create a Request</h3>
            <Form onSubmit={onSubmit} error={!!errorMessage}>
                <Form.Field>
                    <label>Description</label>
                    <Input value={description} onChange={event => setDescription(event.target.value)}/>
                </Form.Field>
                <Form.Field>
                    <label>Value in Ether</label>
                    <Input value={value} onChange={event => setValue(event.target.value)}/>
                </Form.Field>
                <Form.Field>
                    <label>Recipient</label>
                    <Input value={recipient} onChange={event => setRecipient(event.target.value)}/>
                </Form.Field>
                <Message error header={errorMessage} />
                <Button primary loading={loading}>Create</Button>
            </Form>
        </Layout>
    );
}

RequestNew.getInitialProps = getInitialProps;

export default RequestNew;
