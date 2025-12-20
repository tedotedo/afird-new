-- Create user_feedback table for collecting user feedback
CREATE TABLE IF NOT EXISTS user_feedback (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  user_email TEXT,
  feedback_type TEXT CHECK (feedback_type IN ('bug', 'feature', 'improvement', 'praise', 'other')),
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  message TEXT NOT NULL,
  page_url TEXT,
  user_agent TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE user_feedback ENABLE ROW LEVEL SECURITY;

-- Policy: Users can insert their own feedback (authenticated and anonymous)
CREATE POLICY "Users can submit feedback"
  ON user_feedback
  FOR INSERT
  TO authenticated, anon
  WITH CHECK (true);

-- Policy: Only admins can read feedback (update with your admin email)
CREATE POLICY "Admins can read all feedback"
  ON user_feedback
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM auth.users
      WHERE auth.users.id = auth.uid()
      AND (
        auth.users.email = 'odetayinde@gmail.com' 
        OR auth.users.raw_user_meta_data->>'role' = 'admin'
      )
    )
  );

-- Indexes for efficient querying
CREATE INDEX idx_feedback_created_at ON user_feedback(created_at DESC);
CREATE INDEX idx_feedback_type ON user_feedback(feedback_type);
CREATE INDEX idx_feedback_rating ON user_feedback(rating);
CREATE INDEX idx_feedback_user_id ON user_feedback(user_id);

-- Trigger to update updated_at timestamp
CREATE TRIGGER update_user_feedback_updated_at
  BEFORE UPDATE ON user_feedback
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Comment on table
COMMENT ON TABLE user_feedback IS 'Stores user feedback submitted through the feedback widget';

