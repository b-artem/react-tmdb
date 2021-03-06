import React from 'react'
import {
  Layout, Row, Col, Input, Pagination
} from 'antd'
import { range } from 'lodash'

import Header from '../Header'
import MovieItem from '../MovieItem'

const Dashboard = () => (
  <Layout>
    <Header />
    <Layout.Content>
      <Row type="flex">
        <Col
          xs={{ span: 22, offset: 1 }}
          sm={{ span: 20, offset: 2 }}
          md={{ span: 18, offset: 3 }}
          lg={{ span: 16, offset: 4 }}
          xl={{ span: 14, offset: 5 }}
        >
          <Input.Search
            placeholder="Enter movie name"
            size="large"
            enterButton="Search"
            className="top-margin"
          />
        </Col>
      </Row>
      <div className="top-margin">
        <Row
          type="flex"
          gutter={16}
        >
          <Col
            span={20}
            offset={2}
          >
            {range(17).map(item => (
              <Col
                key={item}
                xs={{ span: 12 }}
                sm={{ span: 12 }}
                md={{ span: 8 }}
                lg={{ span: 6 }}
                xl={{ span: 4 }}
              >
                <MovieItem />
              </Col>
            ))}
          </Col>
        </Row>
        <Row
          type="flex"
          justify="center"
        >
          <Col>
            <Pagination
              defaultCurrent={1}
              total={50}
              className="pagination"
            />
          </Col>
        </Row>
      </div>
    </Layout.Content>
  </Layout>
)

export default Dashboard
