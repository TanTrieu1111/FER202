import { useEffect, useState, useContext } from "react";
import { Table, Button, Container } from "react-bootstrap";
import api from "../services/api";
import { AuthContext } from "../contexts/AuthContext";
import ConfirmModal from "../components/ConfirmModal";
import ToastMessage from "../components/ToastMessage";
import FilterBar from "../components/FilterBar";
import { useNavigate } from "react-router-dom";
import AppNavbar from "../components/AppNavbar";
function AccountListPage() {
  const { user } = useContext(AuthContext);
  
  const navigate = useNavigate();
  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  const [accounts, setAccounts] = useState([]);
  const [filters, setFilters] = useState({
    search: "",
    status: "all",
    role: "all",
    sort: ""
  });

  const [selected, setSelected] = useState(null);
  const [showConfirm, setShowConfirm] = useState(false);
  const [toast, setToast] = useState({
    show: false,
    message: "",
    bg: ""
  });

  useEffect(() => {
    fetchAccounts();
  }, []);

  const fetchAccounts = async () => {
    try {
      const res = await api.get("/accounts");
      setAccounts(res.data);
    } catch (error) {
      console.error("Error fetching accounts:", error);
    }
  };

  // FILTER + SORT
  const filteredAccounts = accounts
    .filter((acc) => {
      const matchSearch =
        !filters.search ||
        acc.username.toLowerCase().includes(filters.search.toLowerCase()) ||
        acc.email.toLowerCase().includes(filters.search.toLowerCase());

      const matchStatus =
        filters.status === "all" || acc.status === filters.status;

      const matchRole =
        filters.role === "all" || acc.role === filters.role;

      return matchSearch && matchStatus && matchRole;
    })
    .sort((a, b) => {
      switch (filters.sort) {
        case "username_asc":
          return a.username.localeCompare(b.username);

        case "username_desc":
          return b.username.localeCompare(a.username);
          default:
          return 0;
      }
    });

  const handleLock = (acc) => {
    if (user && acc.id === user.id) {
      setToast({
        show: true,
        message:
          "Cannot self-lock the currently logged-user admin.",
        bg: "warning"
      });
      return;
    }

    setSelected(acc);
    setShowConfirm(true);
  };

  const confirmLock = async () => {
    const newStatus =
      selected.status === "active" ? "locked" : "active";

    await api.patch(`/accounts/${selected.id}`, {
      status: newStatus
    });

    setAccounts((prev) =>
      prev.map((a) =>
        a.id === selected.id
          ? { ...a, status: newStatus }
          : a
      )
    );

    setToast({
      show: true,
      message:
        newStatus === "locked"
          ? "Locked successfully"
          : "Unlocked successfully",
      bg: "success"
    });

    setShowConfirm(false);
  };

  return (
     <>   <AppNavbar />
    <Container className="mt-4">
      <FilterBar filters={filters} setFilters={setFilters} />

      <Table bordered hover responsive>
        <thead>
          <tr>
            <th>Avatar</th>
            <th>Username</th>
            <th>Email</th>
            <th>Role</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {filteredAccounts.map((acc) => (
            <tr key={acc.id}>
              <td>
                <img
                  src={acc.avatar}
                  width="40"
                  alt=""
                />
              </td>
              <td>{acc.username}</td>
              <td>{acc.email}</td>
              <td>{acc.role}</td>
              <td>{acc.status}</td>
              <td>
                <Button
                  size="sm"
                  onClick={() =>
                    navigate(`/accounts/${acc.id}`)
                  }
                >
                  View Details
                </Button>{" "}
                <Button
                  size="sm"
                  variant={
                    acc.status === "active"
                      ? "danger"
                      : "success"
                  }
                  onClick={() => handleLock(acc)}
                >
                  {acc.status === "active"
                    ? "Lock"
                    : "Unlock"}
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <ConfirmModal
        show={showConfirm}
        message={
          selected?.status === "active"
            ? `Lock account ${selected?.username}? The user cannot log in after this`
            : `Unlock account ${selected?.username}?`
        }
        onConfirm={confirmLock}
        onCancel={() => setShowConfirm(false)}
      />

      <ToastMessage
        show={toast.show}
        message={toast.message}
        bg={toast.bg}
        onClose={() =>
          setToast({ ...toast, show: false })
        }
      />
    </Container>
    </>
  );
}

export default AccountListPage;