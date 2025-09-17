import React, { useState } from "react";

export default function Experiment6FormList() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState({ name: "", description: "", quantity: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.description || !form.quantity) return;
    setItems([...items, form]);
    setForm({ name: "", description: "", quantity: "" });
  };
  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #f0f4ff 0%, #e0e7ff 100%)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: 32
    }}>
      <h1 style={{ fontSize: 32, fontWeight: 700, marginBottom: 24, color: '#333' }}>
        Add Items to List
      </h1>
      <div style={{
        background: '#fff',
        borderRadius: 16,
        boxShadow: '0 4px 24px rgba(0,0,0,0.08)',
        padding: 32,
        width: '100%',
        maxWidth: 480,
        marginBottom: 32
      }}>
        <h2 style={{ fontSize: 22, fontWeight: 600, marginBottom: 20 }}>Add New Item</h2>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div>
            <label style={{ fontWeight: 500 }}>Item Name:</label>
            <input
              type="text"
              name="name"
              placeholder="Enter item name"
              value={form.name}
              onChange={handleChange}
              style={{
                width: '100%',
                padding: 10,
                borderRadius: 8,
                border: '1px solid #ccc',
                marginTop: 4
              }}
            />
          </div>
          <div>
            <label style={{ fontWeight: 500 }}>Description:</label>
            <textarea
              name="description"
              placeholder="Enter item description"
              value={form.description}
              onChange={handleChange}
              style={{
                width: '100%',
                padding: 10,
                borderRadius: 8,
                border: '1px solid #ccc',
                marginTop: 4,
                minHeight: 48
              }}
            />
          </div>
          <div>
            <label style={{ fontWeight: 500 }}>Quantity:</label>
            <input
              type="number"
              name="quantity"
              placeholder="Enter quantity"
              value={form.quantity}
              onChange={handleChange}
              style={{
                width: '100%',
                padding: 10,
                borderRadius: 8,
                border: '1px solid #ccc',
                marginTop: 4
              }}
            />
          </div>
          <button
            type="submit"
            style={{
              width: '100%',
              background: '#2563eb',
              color: '#fff',
              padding: 12,
              borderRadius: 8,
              fontWeight: 600,
              fontSize: 16,
              border: 'none',
              marginTop: 8,
              cursor: 'pointer'
            }}
          >
            Add Item
          </button>
        </form>
      </div>
      <div style={{
        background: '#fff',
        borderRadius: 16,
        boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
        padding: 24,
        width: '100%',
        maxWidth: 480
      }}>
        <h3 style={{ fontWeight: 600, marginBottom: 12 }}>
          Items List ({items.length})
        </h3>
        {items.length === 0 ? (
          <div style={{ color: '#888', fontStyle: 'italic' }}>
            No items added yet. Add your first item above!
          </div>
        ) : (
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            {items.map((item, idx) => (
              <li key={idx} style={{
                borderBottom: idx !== items.length - 1 ? '1px solid #eee' : 'none',
                padding: '12px 0'
              }}>
                <div style={{ fontWeight: 500 }}>{item.name}</div>
                <div style={{ color: '#555', fontSize: 14 }}>{item.description}</div>
                <div style={{ color: '#2563eb', fontWeight: 600, fontSize: 13 }}>
                  Quantity: {item.quantity}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}