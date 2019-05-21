import React from "react";
import { Link } from "gatsby";
import styled from "styled-components";
import { Col, Row } from "react-styled-flexboxgrid";
import { getIcon } from "../util/iconUtil";

const Categories = props => {
  const { nodes } = props;

  const CategoryTitle = styled.div`
    color: #333333;
    font-family: Equinor;
    font-size: 30px;
    letter-spacing: -0.08px;
    line-height: 36px;
    margin-top: 5px;
    margin-bottom: 15px;
  `;

  const iconStyle = {
    margin: 0,
    width: "auto",
    height: "auto",
  };

  const categoryComponents = nodes.map(({ node }) => {
    const {
      frontmatter: { title, tags },
      fields: { slug, collection },
    } = node;
    const Icon = getIcon(tags[0]);
    return (
      <Col
        md={4}
        sm={6}
        xs={12}
        key={"category-" + node.fields.slug}
        style={{ marginTop: 50 }}
      >
        <Icon style={iconStyle} />
        <CategoryTitle>
          <Link to={`/${collection}${slug}`}>{title}</Link>
        </CategoryTitle>
        <div>{node.excerpt}</div>
      </Col>
    );
  });

  return <Row>{categoryComponents}</Row>;
};

export { Categories };
