import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, Table, Tag, Tooltip, message, Button, Alert } from 'antd';
import { GlobalOutlined, DeleteOutlined } from '@ant-design/icons';
import Loading from 'components/shared-components/Loading';
import AvatarStatus from 'components/shared-components/AvatarStatus';
import { connect } from "react-redux";
import { loadClients, deleteClient, hideClientsErrorMessage } from 'redux/actions/Clients';

const UserList = (props) => {
	const {
		data,
		isLoading,
		showMessage,
		messageText,
		loadClients,
		deleteClient,
		hideClientsErrorMessage
	} = props;

	useEffect(() => {
		if (!data) {
			loadClients();
		} else if (data && showMessage) {
			hideClientsErrorMessage();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [data])

	const deleteUser = (userId) => {
		deleteClient(userId);

		message.success({ content: `Deleted user ${userId}`, duration: 3 });
	};

	if (isLoading) {
		return (
			<Loading cover="page" />
		)
	}

	if (showMessage) {
		return (
			<Alert
				message="Произошла ошибка запроса, перезагрузите страницу или попробуйте позже!"
				description={messageText}
				type="error"
				showIcon
			/>
		)
	}

	const tableColumns = [
		{
			title: 'User',
			dataIndex: 'name',
			render: (_, record) => (
				<div>
					<Tooltip title="Edit">
						<Link to={`profile/${record.id}`} className="d-flex">
							<AvatarStatus src={record.img} name={record.name} subTitle={record.email}/>
						</Link>
					</Tooltip>
				</div>
			),
			sorter: {
				compare: (a, b) => {
					a = a.name.toLowerCase();
						b = b.name.toLowerCase();
					return a > b ? -1 : b > a ? 1 : 0;
				},
			},
		},
		{
			title: 'Company',
			dataIndex: ['company', 'name'],
			sorter: {
				compare: (a, b) => a.company['name'].length - b.company['name'].length,
			},
		},
		{
			title: 'Web Site',
			dataIndex: 'website',
			render: website => (
				<Tag icon={<GlobalOutlined />} color="#55acee">{website}</Tag>
			),
			sorter: {
				compare: (a, b) => a.website.length - b.website.length,
			},
		},
		{
			title: 'Phone',
			dataIndex: 'phone',
			sorter: {
				compare: (a, b) => a.phone.length - b.phone.length,
			},
		},
		{
			title: '',
			dataIndex: 'actions',
			render: (_, elm) => (
				<div className="text-center">
					<Tooltip title="Delete">
						<Button danger icon={<DeleteOutlined />} onClick={()=> {deleteUser(elm.id)}} size="small"/>
					</Tooltip>
				</div>
			)
		}
	];

	return (
		<Card bodyStyle={{'padding': '0px'}}>
			<Table columns={tableColumns} dataSource={data} rowKey='id' />
		</Card>
	)
};

const mapStateToProps = ({clients}) => {
	const {
		data,
		isLoading,
		showMessage,
		messageText,
	} = clients;

  return { data, isLoading, showMessage, messageText };
};

const mapDispatchToProps = {
	loadClients,
	deleteClient,
	hideClientsErrorMessage
};

export default connect(mapStateToProps, mapDispatchToProps)(UserList)
