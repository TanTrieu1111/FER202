import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../services/api";

function AccountDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [account, setAccount] = useState(null);

  useEffect(() => {
    fetchAccount();
  }, []);

  const fetchAccount = async () => {
    try {
      const res = await api.get(`/accounts/${id}`);
      setAccount(res.data);
    } catch (error) {
      console.error("Error fetching account:", error);
    }
  };

  if (!account) return <p className="text-center mt-4">Loading...</p>;

  return (
    <div className="container mt-4">
      <div className="card shadow-sm">
        <div className="card-header bg-light">
          <h4 className="mb-0">Account Details</h4>
        </div>

        <div className="card-body d-flex align-items-start">
          {/* Avatar */}
          <div className="me-4">
            <img
              src={account.avatar}
              alt="avatar"
              width="120"
              height="120"
              className="rounded-circle"
            />
          </div>

          {/* Info */}
          <div>
            <div className="mb-3">
              <strong>Username</strong>
              <div>{account.username}</div>
            </div>

            <div className="mb-3">
              <strong>Email</strong>
              <div>{account.email}</div>
            </div>

            <div className="mb-3">
              <strong>Role</strong>
              <div className="text-capitalize">{account.role}</div>
            </div>

            <div className="mb-3">
              <strong>Status</strong>
              <div className="text-capitalize">{account.status}</div>
            </div>
          </div>
        </div>

        <div className="card-footer">
          <button
            className="btn btn-secondary"
            onClick={() => navigate("/accounts")}
          >
            Back to list
          </button>
        </div>
      </div>
    </div>
  );
}

export default AccountDetailPage;