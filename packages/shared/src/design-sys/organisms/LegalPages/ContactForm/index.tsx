import React, { useState, useEffect, useCallback } from 'react';
import { CONTACT_EMAIL } from '../shared/contact';
import type { TFunction } from '../shared/types';
import {
  SectionTitle, Paragraph, ContactCard, FormGroup, Label,
  Input, TextArea, SubmitButton, SuccessMessage, ErrorMessage,
} from '../shared/styles';

interface ContactFormProps {
  t?: TFunction;
  userId?: string;
  userEmail?: string;
  userName?: string;
  apiBaseUrl?: string;
}

export const ContactForm: React.FC<ContactFormProps> = ({
  userId, userEmail: initialEmail, userName: initialName,
  apiBaseUrl = 'http://localhost:5000/api',
}) => {
  const [email, setEmail] = useState(initialEmail || '');
  const [name, setName] = useState(initialName || '');

  useEffect(() => {
    if (initialEmail) {
      setEmail(initialEmail);
    }
  }, [initialEmail]);

  useEffect(() => {
    if (initialName) {
      setName(initialName);
    }
  }, [initialName]);
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!email || !subject || !message) {
      setError('Completá todos los campos requeridos.');
      return;
    }

    setSubmitting(true);
    try {
      const resp = await fetch(`${apiBaseUrl}/support/ticket`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, name, subject, message, userId }),
      });
      const data = await resp.json();

      if (data.success) {
        setSuccess(
          `Ticket creado: ${data.ticket.ticketId}. Te enviamos una copia a ${email}.` +
          (data.contacto ? ` Contacto: ${data.contacto}` : '')
        );
        setSubject('');
        setMessage('');
      } else {
        setError(data.error || 'Error al enviar el ticket.');
      }
    } catch {
      setError('Error de conexión. Intentá de nuevo más tarde.');
    } finally {
      setSubmitting(false);
    }
  }, [email, name, subject, message, userId, apiBaseUrl]);

  return (
    <ContactCard>
      <SectionTitle>Contacto y Reclamaciones</SectionTitle>
      <Paragraph>
        Si tenés alguna consulta, reclamo o querés ejercer tus derechos sobre tus datos personales,
        completá el formulario a continuación. Te responderemos a la brevedad.
      </Paragraph>
      <Paragraph>
        También podés contactarnos directamente a: <strong>{CONTACT_EMAIL}</strong>
      </Paragraph>

      <form onSubmit={handleSubmit}>
        {!initialEmail && (
          <FormGroup>
            <Label>Email *</Label>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="tu@email.com"
              required
            />
          </FormGroup>
        )}
        {!initialName && (
          <FormGroup>
            <Label>Nombre</Label>
            <Input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Tu nombre"
            />
          </FormGroup>
        )}
        <FormGroup>
          <Label>Asunto *</Label>
          <Input
            type="text"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            placeholder="Ej: Consulta sobre mi factura"
            required
          />
        </FormGroup>
        <FormGroup>
          <Label>Mensaje *</Label>
          <TextArea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Describí tu consulta o reclamo en detalle..."
            required
          />
        </FormGroup>

        {error && <ErrorMessage>{error}</ErrorMessage>}
        {success && <SuccessMessage>{success}</SuccessMessage>}

        <SubmitButton type="submit" $disabled={submitting}>
          {submitting ? 'Enviando...' : 'Enviar mensaje'}
        </SubmitButton>
      </form>
    </ContactCard>
  );
};

export default ContactForm;
