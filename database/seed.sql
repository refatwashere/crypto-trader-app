-- database/seed.sql - sample seed data
INSERT INTO users (username, email, password_hash) VALUES
('alice', 'alice@example.com', 'hash1'),
('bob', 'bob@example.com', 'hash2');

INSERT INTO portfolios (user_id, name) VALUES
(1, 'Main'),
(2, 'Trading');

INSERT INTO transactions (portfolio_id, symbol, side, quantity, price) VALUES
(1, 'BTC', 'BUY', 0.01, 30000),
(2, 'ETH', 'BUY', 0.5, 2000);
