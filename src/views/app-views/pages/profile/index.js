import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { useHistory } from 'react-router-dom';
import { Form, Avatar, Button, Input, Row, Col, message, Upload, Alert } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import Loading from 'components/shared-components/Loading';
import { ROW_GUTTER } from 'constants/ThemeConstant';
import Flex from 'components/shared-components/Flex';
import clientsService from 'services/ClientsService';

const EditProfile = () => {
	const [client, setClient] = useState(null);
	const [isSaving, setIsSaving] = useState(false);
	const [error, setError] = useState(false);
	const { id } = useParams();
	const history = useHistory();

	const onSuccess = (data) => {
		setClient(data);
	};

	const onError = (err) => {
		setError(err);
	};

	useEffect(() => {
		if (!client) {
			clientsService.getClientById(id, onSuccess, onError)
		}
	})

	const fakeUpload = (file) => {
			return new Promise((resolve, reject) => {
				setTimeout(() => {
					resolve(file.onSuccess())
				}, 500)
			})
	};

	const getBase64 = (img, callback) => {
		const reader = new FileReader();
		reader.addEventListener('load', () => callback(reader.result));
		reader.readAsDataURL(img);
	};

	const onFinish = values => {
		setIsSaving(true);
		const key = 'updatable';
		message.loading({ content: 'Updating...', key });
		setTimeout(() => {
			setClient({
				name: values.name,
				email: values.email,
				username: values.username,
				phone: values.phone,
				website: values.website,
				address: {
					street: values.street,
					city: values.city,
					zipcode: values.zipcode,
				},
				img: client.img
			})
			message.success({ content: 'Done!', key, duration: 3 });
			setIsSaving(false);
			history.push("/app/pages/clients-list");
		}, 1000);
	};

	const onFinishFailed = errorInfo => {
		setError(errorInfo);
	};

	const onUploadAavater = info => {
		const key = 'updatable';
		if (info.file.status === 'uploading') {
			message.loading({ content: 'Uploading...', key });
		}
		if (info.file.status === 'done') {
			getBase64(info.file.originFileObj, imageUrl =>
				setClient((client) => ({...client, img: imageUrl})),
			);
			message.success({ content: 'Uploaded!', key,  duration: 3});
		}
	};

	const onRemoveAvater = () => {
		setClient((client) => ({...client, img: ''}));
	}


	if ((!client || isSaving) && !error) {
		return (
			<Loading cover="page" />
		)
	}

	if (error) {
		return (
			<Alert
				message="Произошла ошибка запроса, перезагрузите страницу или попробуйте позже!"
				description={error}
				type="error"
				showIcon
			/>
		)
	}

	const { name, email, username, phone, address, website, img } = client;
	const {street, city, zipcode} = address;

	return (
		<>
			<Flex alignItems="center" mobileFlex={false} className="text-center text-md-left">
				<Avatar size={90} src={img} icon={<UserOutlined />}/>
				<div className="ml-md-3 mt-md-0 mt-3">
					<Upload onChange={onUploadAavater} showUploadList={false} customRequest={fakeUpload}>
						<Button type="primary">Change Avatar</Button>
					</Upload>
					<Button className="ml-2" onClick={onRemoveAvater}>Remove</Button>
				</div>
			</Flex>
			<div className="mt-4">
				<Form
					name="basicInformation"
					initialValues={
						{ 
							'name': name,
							'email': email,
							'username': username,
							'phone': phone,
							'website': website,
							'street': street,
							'city': city,
							'zipcode': zipcode,
							'img': img
						}
					}
					onFinish={onFinish}
					onFinishFailed={onFinishFailed}
				>
					<Row>
						<Col xs={24} sm={24} md={24} lg={16}>
							<Row gutter={ROW_GUTTER}>
								<Col xs={24} sm={24} md={12}>
									<Form.Item
										label="Name"
										name="name"
										rules={[
											{
												required: true,
												message: 'Please input your name!',
											},
										]}
									>
										<Input />
									</Form.Item>
								</Col>
								<Col xs={24} sm={24} md={12}>
									<Form.Item
										label="username"
										name="username"
										rules={[
											{
												required: true,
												message: 'Please input your username!'
											},
										]}
									>
										<Input />
									</Form.Item>
								</Col>
								<Col xs={24} sm={24} md={12}>
									<Form.Item
										label="Email"
										name="email"
										rules={[{ 
											required: true,
											type: 'email',
											message: 'Please enter a valid email!' 
										}]}
									>
										<Input />
									</Form.Item>
								</Col>
								<Col xs={24} sm={24} md={12}>
									<Form.Item
										label="Phone Number"
										name="phone"
									>
										<Input />
									</Form.Item>
								</Col>
								<Col xs={24} sm={24} md={12}>
									<Form.Item
										label="Website"
										name="website"
									>
										<Input />
									</Form.Item>
								</Col>
								<Col xs={24} sm={24} md={24}>
									<Form.Item
										label="Street"
										name="street"
									>
										<Input />
									</Form.Item>
								</Col>
								<Col xs={24} sm={24} md={12}>
									<Form.Item
										label="City"
										name="city"
									>
										<Input />
									</Form.Item>
								</Col>
								<Col xs={24} sm={24} md={12}>
									<Form.Item
										label="Post code"
										name="zipcode"
									>
										<Input />
									</Form.Item>
								</Col>
							</Row>
							<Button type="primary" htmlType="submit">
								Save Change
							</Button>
						</Col>
					</Row>
				</Form>
			</div>
		</>
	)
}

export default EditProfile
