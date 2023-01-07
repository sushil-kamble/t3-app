import { z } from 'zod';
import { router, protectedProcedure } from '../trpc';

export const todoRouter = router({
    getAll: protectedProcedure.query(({ ctx }) => {
        return ctx.prisma.todo.findMany({
            where: { userId: ctx.session?.user?.id },
            orderBy: { id: 'desc' },
        });
    }),
    create: protectedProcedure
        .input(z.object({ title: z.string() }))
        .mutation(async ({ ctx, input }) => {
            return ctx.prisma.todo.create({
                data: {
                    title: input.title,
                    user: {
                        connect: { id: ctx.session?.user?.id },
                    },
                },
            });
        }),
    toggle: protectedProcedure
        .input(z.object({ id: z.number() }))
        .mutation(async ({ ctx, input }) => {
            const todo = await ctx.prisma.todo.findUnique({
                where: { id: input.id },
            });
            if (!todo) {
                throw new Error('Todo not found');
            }
            return ctx.prisma.todo.update({
                where: { id: input.id },
                data: { completed: !todo.completed },
            });
        }),
    update: protectedProcedure
        .input(z.object({ id: z.number(), title: z.string() }))
        .mutation(async ({ ctx, input }) => {
            const todo = await ctx.prisma.todo.findUnique({
                where: { id: input.id },
            });
            if (!todo) {
                throw new Error('Todo not found');
            }
            return ctx.prisma.todo.update({
                where: { id: input.id },
                data: { title: input.title },
            });
        }),
    delete: protectedProcedure
        .input(z.object({ id: z.number() }))
        .mutation(async ({ ctx, input }) => {
            const todo = await ctx.prisma.todo.findUnique({
                where: { id: input.id },
            });
            if (!todo) {
                throw new Error('Todo not found');
            }
            return ctx.prisma.todo.delete({
                where: { id: input.id },
            });
        }),
});
