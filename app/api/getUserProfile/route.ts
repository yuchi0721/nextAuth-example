import { headers } from 'next/headers';
export async function GET(request: Request) {
  const headersList = headers();
  const Authorization = headersList.get('Authorization');
  if (!Authorization) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const mockProfile = {
    name: 'Name',
    empId: '676767',
  };

  return Response.json({ mockProfile });
}
