import { Form, Row, Col } from "react-bootstrap";

function FilterBar({ filters, setFilters }) {
  return (
    <Row className="mb-3">
      {/* Search */}
      <Col>
        <Form.Control
          placeholder="Search by username or email"
          value={filters.search}
          onChange={(e) =>
            setFilters({ ...filters, search: e.target.value })
          }
        />
      </Col>

      {/* Status */}
      <Col>
        <Form.Select
          value={filters.status}
          onChange={(e) =>
            setFilters({ ...filters, status: e.target.value })
          }
        >
          <option value="all">All Status</option>
          <option value="active">Active</option>
          <option value="locked">Locked</option>
        </Form.Select>
      </Col>

      {/* Role */}
      <Col>
        <Form.Select
          value={filters.role}
          onChange={(e) =>
            setFilters({ ...filters, role: e.target.value })
          }
        >
          <option value="all">All Role</option>
          <option value="admin">Admin</option>
          <option value="user">User</option>
        </Form.Select>
      </Col>

      {/* Sort */}
      <Col>
        <Form.Select
          value={filters.sort}
          onChange={(e) =>
            setFilters({ ...filters, sort: e.target.value })
          }
        >
          <option value="">Sort</option>
          <option value="username_asc">Username A → Z</option>
          <option value="username_desc">Username Z → A</option>
          
        </Form.Select>
      </Col>
    </Row>
  );
}

export default FilterBar;